import rbacRepository from "./rbac.repository.js";
import {
  NotFoundError,
  ConflictError,
  BadRequestError,
} from "../../utils/app-error.js";

class RBACService {
  // --- Permissions ---
  async getAllPermissions() {
    return await rbacRepository.findAllPermissions();
  }

  async createPermission(name) {
    const existing = await rbacRepository.findAllPermissions();
    if (existing.some((p) => p.name === name)) {
      throw new ConflictError(`Permission "${name}" already exists`);
    }
    return await rbacRepository.createPermission({ name });
  }

  async deletePermission(id) {
    const permission = await rbacRepository.findPermissionById(id);
    if (!permission) {
      throw new NotFoundError("Permission not found");
    }
    return await rbacRepository.deletePermission(id);
  }

  // --- Roles ---
  async getAllRoles() {
    return await rbacRepository.findAllRoles();
  }

  async getRoleById(id) {
    const role = await rbacRepository.findRoleById(id);
    if (!role) {
      throw new NotFoundError("Role not found");
    }
    return role;
  }

  async createRole(name, permissionIds) {
    const existing = await rbacRepository.findRoleByName(name);
    if (existing) {
      throw new ConflictError(`Role "${name}" already exists`);
    }

    if (permissionIds && permissionIds.length > 0) {
      const allPermissions = await rbacRepository.findAllPermissions();
      const validIds = allPermissions.map((p) => p.id);
      const invalidIds = permissionIds.filter((id) => !validIds.includes(id));
      if (invalidIds.length > 0) {
        throw new BadRequestError(`Invalid permission IDs: ${invalidIds.join(", ")}`);
      }
    }

    return await rbacRepository.createRole(name, permissionIds);
  }

  async updateRole(id, data) {
    const { name, permissionIds } = data;
    const role = await rbacRepository.findRoleById(id);
    if (!role) {
      throw new NotFoundError("Role not found");
    }

    if (name && name !== role.name) {
      const existing = await rbacRepository.findRoleByName(name);
      if (existing) {
        throw new ConflictError(`Role "${name}" already exists`);
      }
    }

    if (permissionIds) {
      const allPermissions = await rbacRepository.findAllPermissions();
      const validIds = allPermissions.map((p) => p.id);
      const invalidIds = permissionIds.filter((id) => !validIds.includes(id));
      if (invalidIds.length > 0) {
        throw new BadRequestError(`Invalid permission IDs: ${invalidIds.join(", ")}`);
      }
    }

    return await rbacRepository.updateRole(id, name, permissionIds);
  }

  async deleteRole(id) {
    const role = await rbacRepository.findRoleById(id);
    if (!role) {
      throw new NotFoundError("Role not found");
    }
    return await rbacRepository.deleteRole(id);
  }

  // --- User Roles ---
  async assignRolesToUser(userId, roleIds) {
    // Basic existence check could be added here for userId if needed
    // Assuming userId is valid from auth/middleware

    const allRoles = await rbacRepository.findAllRoles();
    const validRoleIds = allRoles.map((r) => r.id);
    const invalidIds = roleIds.filter((id) => !validRoleIds.includes(id));
    if (invalidIds.length > 0) {
      throw new BadRequestError(`Invalid role IDs: ${invalidIds.join(", ")}`);
    }

    return await rbacRepository.assignRolesToUser(userId, roleIds);
  }

  async getUserRoles(userId) {
    return await rbacRepository.findUserRoles(userId);
  }

  async getUserPermissions(userId) {
    const userRoles = await rbacRepository.findUserRoles(userId);
    const permissions = new Set();
    userRoles.forEach((ur) => {
      ur.role.rolePermissions.forEach((rp) => {
        permissions.add(rp.permission.name);
      });
    });
    return Array.from(permissions);
  }
}

export default new RBACService();
