import prisma from "../../config/prisma.js";

class RBACRepository {
  // --- Permissions ---
  async findAllPermissions() {
    return await prisma.permission.findMany();
  }

  async findPermissionById(id) {
    return await prisma.permission.findUnique({ where: { id } });
  }

  async createPermission(data) {
    return await prisma.permission.create({ data });
  }

  async deletePermission(id) {
    return await prisma.permission.delete({ where: { id } });
  }

  // --- Roles ---
  async findAllRoles() {
    return await prisma.role.findMany({
      include: {
        rolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  async findRoleById(id) {
    return await prisma.role.findUnique({
      where: { id },
      include: {
        rolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  async findRoleByName(name) {
    return await prisma.role.findUnique({ where: { name } });
  }

  async createRole(name, permissionIds = []) {
    return await prisma.role.create({
      data: {
        name,
        rolePermissions: {
          create: permissionIds.map((pId) => ({
            permissionId: pId,
          })),
        },
      },
      include: {
        rolePermissions: true,
      },
    });
  }

  async updateRole(id, name, permissionIds) {
    return await prisma.$transaction(async (tx) => {
      // Update name if provided
      const role = await tx.role.update({
        where: { id },
        data: { name },
      });

      if (permissionIds) {
        // Delete old permissions
        await tx.rolePermission.deleteMany({
          where: { roleId: id },
        });

        // Add new permissions
        await tx.rolePermission.createMany({
          data: permissionIds.map((pId) => ({
            roleId: id,
            permissionId: pId,
          })),
        });
      }

      return await tx.role.findUnique({
        where: { id },
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      });
    });
  }

  async deleteRole(id) {
    return await prisma.role.delete({ where: { id } });
  }

  // --- User Roles ---
  async assignRolesToUser(userId, roleIds) {
    return await prisma.$transaction(async (tx) => {
      // Remove current roles
      await tx.userRole.deleteMany({
        where: { userId },
      });

      // Assign new roles
      await tx.userRole.createMany({
        data: roleIds.map((rId) => ({
          userId,
          roleId: rId,
        })),
      });

      return await tx.userRole.findMany({
        where: { userId },
        include: {
          role: true,
        },
      });
    });
  }

  async findUserRoles(userId) {
    return await prisma.userRole.findMany({
      where: { userId },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });
  }
}

export default new RBACRepository();
