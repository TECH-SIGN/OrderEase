import { registerAs } from '@nestjs/config';
import { validateEnv } from '@orderease/shared-config';

export default registerAs('jwt', () => {
  const env = validateEnv();
  return {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
    refreshSecret: env.JWT_REFRESH_SECRET,
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
  };
});
