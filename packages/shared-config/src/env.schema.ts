import { z } from 'zod';

/**
 * Environment variable schema
 * Validates all required environment variables at application startup
 */
export const envSchema = z.object({
  // Database Configuration
  DATABASE_URL: z
    .string()
    .url('DATABASE_URL must be a valid PostgreSQL connection string')
    .startsWith('postgresql://', {
      message: 'DATABASE_URL must be a PostgreSQL connection string',
    }),

  // JWT Configuration
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters for security')
    .refine(
      (val) => {
        const trimmedVal = val.trim();
        const forbiddenValues = [
          'default-secret-change-me',
          'your_super_secret_jwt_key_here_change_in_production',
          'change_me',
          'changeme',
          'default',
        ];
        return !forbiddenValues.some(
          (forbidden) => trimmedVal.toLowerCase().includes(forbidden),
        );
      },
      {
        message:
          'JWT_SECRET must not use default/example values. Please set a unique, random secret.',
      },
    ),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, 'JWT_REFRESH_SECRET must be at least 32 characters for security')
    .refine(
      (val) => {
        const trimmedVal = val.trim();
        const forbiddenValues = [
          'default-refresh-secret-change-me',
          'your_super_secret_refresh_key_here_change_in_production',
          'change_me',
          'changeme',
          'default',
        ];
        return !forbiddenValues.some(
          (forbidden) => trimmedVal.toLowerCase().includes(forbidden),
        );
      },
      {
        message:
          'JWT_REFRESH_SECRET must not use default/example values. Please set a unique, random secret.',
      },
    ),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),

  // Application Configuration
  PORT: z
    .string()
    .default('3000')
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val < 65536, {
      message: 'PORT must be between 1 and 65535',
    }),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // CORS Configuration
  CORS_ORIGIN: z.string().default('http://localhost:3001'),
});

export type EnvConfig = z.infer<typeof envSchema>;

/**
 * Cached validated environment configuration
 * Ensures validation happens only once
 */
let cachedEnvConfig: EnvConfig | null = null;

/**
 * Validates environment variables
 * Throws error with clear message if validation fails
 * Uses cache to avoid redundant validations
 */
export function validateEnv(): EnvConfig {
  if (cachedEnvConfig) {
    return cachedEnvConfig;
  }

  try {
    cachedEnvConfig = envSchema.parse(process.env);
    return cachedEnvConfig;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues
        .map((err) => {
          const path = err.path.join('.');
          const currentValue = process.env[path];
          let displayValue = '';
          
          // Show partial value for debugging (hide sensitive parts)
          if (currentValue && path.includes('SECRET')) {
            displayValue = ` (current: ${currentValue.substring(0, 10)}...${currentValue.substring(currentValue.length - 4)})`;
          } else if (currentValue) {
            displayValue = ` (current: ${currentValue})`;
          }
          
          return `  ❌ ${path}: ${err.message}${displayValue}`;
        })
        .join('\n');

      console.error('\n🚨 Environment Validation Failed:\n');
      console.error(errorMessages);
      console.error(
        '\n💡 Tips:',
        '\n  • Ensure .env file exists in the app directory',
        '\n  • JWT secrets must be at least 32 characters',
        '\n  • Secrets cannot contain words like "default", "change_me", or example values',
        '\n  • Generate secrets using: node -e "console.log(require(\'crypto\').randomBytes(64).toString(\'hex\'))"',
        '\n',
      );

      throw new Error('Invalid environment configuration');
    }
    throw error;
  }
}

/**
 * Resets the cached environment configuration
 * Used for testing purposes only
 */
export function resetEnvCache(): void {
  cachedEnvConfig = null;
}
