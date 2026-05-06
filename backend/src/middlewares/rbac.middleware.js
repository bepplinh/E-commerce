import rbacService from "../modules/rbac/rbac.service.js";
import { ForbiddenError } from "../utils/app-error.js";

/**
 * Middleware to check if the authenticated user has a required permission.
 * Assumes req.user is set by verifyToken middleware.
 * @param {string} requiredPermission - The name of the permission required.
 */
const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        throw new ForbiddenError("User not authenticated or ID missing");
      }

      const userPermissions = await rbacService.getUserPermissions(req.user.id);
      
      // Admin usually has all permissions or can be handled specifically
      if (userPermissions.includes("ADMIN") || userPermissions.includes(requiredPermission)) {
        return next();
      }

      throw new ForbiddenError(`Permission "${requiredPermission}" is required to access this resource`);
    } catch (error) {
      next(error);
    }
  };
};

export default checkPermission;
