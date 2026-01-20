/**
 * Application-wide constants
 */
export declare enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare const MESSAGES: {
    readonly AUTH: {
        readonly SIGNUP_SUCCESS: "User registered successfully";
        readonly LOGIN_SUCCESS: "Login successful";
        readonly INVALID_CREDENTIALS: "Invalid email or password";
        readonly USER_EXISTS: "User with this email already exists";
        readonly USER_NOT_FOUND: "User not found";
        readonly UNAUTHORIZED: "Unauthorized access";
        readonly FORBIDDEN: "You do not have permission to access this resource";
        readonly TOKEN_EXPIRED: "Token has expired";
        readonly TOKEN_INVALID: "Invalid token";
        readonly LOGOUT_SUCCESS: "Logout successful";
    };
    readonly USER: {
        readonly PROFILE_FETCHED: "Profile fetched successfully";
        readonly PROFILE_UPDATED: "Profile updated successfully";
        readonly NOT_FOUND: "User not found";
        readonly DELETED: "User deleted successfully";
    };
    readonly ADMIN: {
        readonly DASHBOARD_ACCESS: "Admin dashboard accessed";
        readonly USERS_FETCHED: "Users fetched successfully";
        readonly USER_ROLE_UPDATED: "User role updated successfully";
    };
    readonly GENERAL: {
        readonly SUCCESS: "Operation successful";
        readonly NOT_FOUND: "Resource not found";
        readonly INTERNAL_ERROR: "Internal server error";
        readonly BAD_REQUEST: "Bad request";
    };
};
export declare const ERROR_CODES: {
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR";
    readonly AUTHORIZATION_ERROR: "AUTHORIZATION_ERROR";
    readonly NOT_FOUND_ERROR: "NOT_FOUND_ERROR";
    readonly CONFLICT_ERROR: "CONFLICT_ERROR";
    readonly INTERNAL_ERROR: "INTERNAL_ERROR";
};
//# sourceMappingURL=constants.d.ts.map