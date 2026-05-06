import { z } from "zod";

export const createRoleSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Role name must be at least 2 characters long"),
    permissionIds: z.array(z.number()).optional(),
  }),
});

export const updateRoleSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    permissionIds: z.array(z.number()).optional(),
  }),
});

export const createPermissionSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Permission name must be at least 2 characters long"),
  }),
});

export const assignRolesSchema = z.object({
  body: z.object({
    roleIds: z.array(z.number()).min(1, "At least one role ID must be provided"),
  }),
});
