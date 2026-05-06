import ApiResponse from "../../../helpers/response.helper.js";
import { BadRequestError } from "../../../utils/app-error.js";
import googleService from "./google.service.js";

const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    path: "/",
};

const loginByGoogle = async (req, res) => {
    const { idToken, accessToken } = req.body;
    if (!idToken && !accessToken) throw new BadRequestError("Missing idToken or accessToken");

    const result = await googleService.loginByGoogle({ idToken, accessToken });

    // Refresh token → httpOnly cookie
    res.cookie("refreshToken", result.refreshToken, REFRESH_COOKIE_OPTIONS);

    return ApiResponse(res, {
        statusCode: 200,
        message: "Login successfully",
        data: {
            token: result.accessToken,
            user: result.user,
        },
    });
};

export default loginByGoogle;

