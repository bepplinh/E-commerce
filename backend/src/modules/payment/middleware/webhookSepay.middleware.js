import { BadRequestError, UnauthorizedError } from "../../../utils/app-error.js";

const checkApiKey = (req, res, next) => {
    const data = req.body;

    if (!data || !data.id) {
        throw new BadRequestError("Invalid data");
    }

    const apiKey = req.headers["authorization"];
    if (apiKey !== `Apikey ${process.env.SEPAY_WEBHOOK_API_KEY}`) {
        throw new UnauthorizedError("Unauthorized");
    }

    next();
};

export default checkApiKey;
