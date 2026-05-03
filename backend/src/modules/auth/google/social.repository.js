import prisma from "../../../config/prisma.js";

const socialRepository = {
    findByProviderId: async (providerId, client = prisma) => {
        return client.socialAccount.findUnique({
            where: {
                provider_providerId: {
                    provider: "google",
                    providerId: providerId,
                },
            },
            include: { user: true },
        });
    },

    createSocialAccount: (data, client = prisma) => {
        return client.socialAccount.create({
            data,
        });
    },
};

export default socialRepository;
