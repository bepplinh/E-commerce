import express from "express";
import * as rbacController from "./rbac.controller.js";
import verifyToken from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import * as rbacValidation from "./rbac.validation.js";

const rbacRouter = express.Router();

// All RBAC routes require authentication
rbacRouter.use(verifyToken);

// --- Permissions ---
rbacRouter.get("/permissions", rbacController.getAllPermissions);
rbacRouter.post(
  "/permissions",
  validate(rbacValidation.createPermissionSchema),
  rbacController.createPermission
);
rbacRouter.delete("/permissions/:id", rbacController.deletePermission);

// --- Roles ---
rbacRouter.get("/roles", rbacController.getAllRoles);
rbacRouter.get("/roles/:id", rbacController.getRoleById);
rbacRouter.post(
  "/roles",
  validate(rbacValidation.createRoleSchema),
  rbacController.createRole
);
rbacRouter.put(
  "/roles/:id",
  validate(rbacValidation.updateRoleSchema),
  rbacController.updateRole
);
rbacRouter.delete("/roles/:id", rbacController.deleteRole);

// --- User Roles ---
rbacRouter.get("/users/:userId/roles", rbacController.getUserRoles);
rbacRouter.post(
  "/users/:userId/roles",
  validate(rbacValidation.assignRolesSchema),
  rbacController.assignRolesToUser
);

export default rbacRouter;
