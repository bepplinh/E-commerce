import { ForbiddenError, UnauthorizedError } from "../utils/app-error.js";

const isAdminMiddleware = (req, res, next) => {
    console.log("Admin middleware hit");
    console.log("req.user:", req.user);

    if (!req.user) {
        throw new UnauthorizedError("Authentication required");
    }

    const role = req.user.role;

    if (role !== "admin") {
        throw new ForbiddenError("Access Denied: Admin role required");
    }
    next();
};

export default isAdminMiddleware;
