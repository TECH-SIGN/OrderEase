"use strict";
/**
 * Application-wide constants
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_CODES = exports.MESSAGES = exports.Role = void 0;
// Role constants
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
})(Role || (exports.Role = Role = {}));
// Response messages
exports.MESSAGES = {
    // Auth messages
    AUTH: {
        SIGNUP_SUCCESS: 'User registered successfully',
        LOGIN_SUCCESS: 'Login successful',
        INVALID_CREDENTIALS: 'Invalid email or password',
        USER_EXISTS: 'User with this email already exists',
        USER_NOT_FOUND: 'User not found',
        UNAUTHORIZED: 'Unauthorized access',
        FORBIDDEN: 'You do not have permission to access this resource',
        TOKEN_EXPIRED: 'Token has expired',
        TOKEN_INVALID: 'Invalid token',
        LOGOUT_SUCCESS: 'Logout successful',
    },
    // User messages
    USER: {
        PROFILE_FETCHED: 'Profile fetched successfully',
        PROFILE_UPDATED: 'Profile updated successfully',
        NOT_FOUND: 'User not found',
        DELETED: 'User deleted successfully',
    },
    // Admin messages
    ADMIN: {
        DASHBOARD_ACCESS: 'Admin dashboard accessed',
        USERS_FETCHED: 'Users fetched successfully',
        USER_ROLE_UPDATED: 'User role updated successfully',
    },
    // General messages
    GENERAL: {
        SUCCESS: 'Operation successful',
        NOT_FOUND: 'Resource not found',
        INTERNAL_ERROR: 'Internal server error',
        BAD_REQUEST: 'Bad request',
    },
};
// Error codes
exports.ERROR_CODES = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
    NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
    CONFLICT_ERROR: 'CONFLICT_ERROR',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
};
//# sourceMappingURL=constants.js.map