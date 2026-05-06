import ApiResponse from "../../helpers/response.helper.js";
import rbacService from "./rbac.service.js";

// --- Permissions ---
const getAllPermissions = async (req, res) => {
  const permissions = await rbacService.getAllPermissions();
  return ApiResponse(res, {
    statusCode: 200,
    data: permissions,
  });
};

const createPermission = async (req, res) => {
  const { name } = req.body;
  const permission = await rbacService.createPermission(name);
  return ApiResponse(res, {
    statusCode: 201,
    message: "Permission created successfully",
    data: permission,
  });
};

const deletePermission = async (req, res) => {
  const { id } = req.params;
  await rbacService.deletePermission(parseInt(id));
  return ApiResponse(res, {
    statusCode: 200,
    message: "Permission deleted successfully",
  });
};

// --- Roles ---
const getAllRoles = async (req, res) => {
  const roles = await rbacService.getAllRoles();
  return ApiResponse(res, {
    statusCode: 200,
    data: roles,
  });
};

const getRoleById = async (req, res) => {
  const { id } = req.params;
  const role = await rbacService.getRoleById(parseInt(id));
  return ApiResponse(res, {
    statusCode: 200,
    data: role,
  });
};

const createRole = async (req, res) => {
  const { name, permissionIds } = req.body;
  const role = await rbacService.createRole(name, permissionIds);
  return ApiResponse(res, {
    statusCode: 201,
    message: "Role created successfully",
    data: role,
  });
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const role = await rbacService.updateRole(parseInt(id), req.body);
  return ApiResponse(res, {
    statusCode: 200,
    message: "Role updated successfully",
    data: role,
  });
};

const deleteRole = async (req, res) => {
  const { id } = req.params;
  await rbacService.deleteRole(parseInt(id));
  return ApiResponse(res, {
    statusCode: 200,
    message: "Role deleted successfully",
  });
};

// --- User Roles ---
const assignRolesToUser = async (req, res) => {
  const { userId } = req.params;
  const { roleIds } = req.body;
  const userRoles = await rbacService.assignRolesToUser(parseInt(userId), roleIds);
  return ApiResponse(res, {
    statusCode: 200,
    message: "Roles assigned to user successfully",
    data: userRoles,
  });
};

const getUserRoles = async (req, res) => {
  const { userId } = req.params;
  const userRoles = await rbacService.getUserRoles(parseInt(userId));
  return ApiResponse(res, {
    statusCode: 200,
    data: userRoles,
  });
};

export {
  getAllPermissions,
  createPermission,
  deletePermission,
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  assignRolesToUser,
  getUserRoles,
};
