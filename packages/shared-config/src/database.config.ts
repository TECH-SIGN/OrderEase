import { registerAs } from '@nestjs/config';
import { validateEnv } from '@orderease/shared-config';

export default registerAs('database', () => {
  const env = validateEnv();
  return {
    url: env.DATABASE_URL,
  };
});
