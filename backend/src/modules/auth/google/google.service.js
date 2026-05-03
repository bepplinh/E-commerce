import { OAuth2Client } from "google-auth-library";
import { UnauthorizedError } from "../../../utils/app-error.js";
import socialRepository from "./social.repository.js";
import authRepository from "../auth.repository.js";
import { signAccessToken, generateRefreshToken, REFRESH_TOKEN_EXPIRES_MS } from "../auth.service.js";
import bcrypt from "bcrypt";
import prisma from "../../../config/prisma.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

const googleService = {
    loginByGoogle: async ({ idToken, accessToken }) => {
        let payload;
        try {
            if (idToken) {
                // Flow 1: GoogleLogin component sends id_token
                const ticket = await googleClient.verifyIdToken({
                    idToken,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                payload = ticket.getPayload();
            } else if (accessToken) {
                // Flow 2: useGoogleLogin implicit flow sends access_token
                const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                if (!res.ok) throw new Error("Failed to fetch user info from Google");
                payload = await res.json();
            }
        } catch {
            throw new UnauthorizedError("Invalid google token");
        }

        const { sub: providerId, email, name, picture } = payload;

        return await prisma.$transaction(async (tx) => {
            let socialAccount = await socialRepository.findByProviderId(providerId, tx);
            let user;

            if (socialAccount) {
                user = socialAccount.user;
            } else {
                user = await authRepository.findUserByEmail(email, tx);
                if (!user) {
                    const username = email.split("@")[0] + "_" + Math.random().toString(36).slice(-4);
                    const randomPassword = await bcrypt.hash(Math.random().toString(36), 10);
                    user = await authRepository.createUser({ username, email, password: randomPassword, fullName: name, avatarUrl: picture }, tx);
                }

                await socialRepository.createSocialAccount({
                    provider: "google",
                    providerId: providerId,
                    userId: user.id,
                }, tx);
            }

            const accessToken = signAccessToken(user);
            const refreshToken = generateRefreshToken();
            const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS);
            await authRepository.createRefreshToken(user.id, refreshToken, expiresAt, tx);

            return {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    fullName: user.fullName,
                    avatarUrl: user.avatarUrl ?? null,
                },
            };
        });
    },
};

export default googleService;
