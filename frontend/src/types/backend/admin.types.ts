/**
 * Admin module DTOs
 * Mirror backend/src/admin/dto/*.ts
 */

import { Role } from './common.types';
import { SafeUser } from './user.types';

/**
 * UpdateUserRoleDto from backend/src/admin/dto/admin.dto.ts
 */
export interface UpdateUserRoleDto {
  role: Role;
}

/**
 * AdminUpdateUserDto from backend/src/admin/dto/admin.dto.ts
 */
export interface AdminUpdateUserDto {
  name?: string;
  email?: string;
  role?: Role;
}

/**
 * Admin dashboard response structure
 */
export interface AdminDashboardData {
  admin: {
    id: string;
    role: string;
  };
  totalUsers?: number;
  totalOrders?: number;
  totalRevenue?: number;
  recentOrders?: unknown[];
}

/**
 * Paginated users response
 */
export interface PaginatedUsers {
  users: SafeUser[];
  total: number;
  page: number;
  limit: number;
}
