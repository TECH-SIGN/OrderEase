import { registerAs } from '@nestjs/config';
import { validateEnv } from '@orderease/shared-config';

export default registerAs('app', () => {
  const env = validateEnv();
  return {
    port: env.PORT,
    nodeEnv: env.NODE_ENV,
    corsOrigin: env.CORS_ORIGIN,
  };
});
