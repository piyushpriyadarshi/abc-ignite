import 'dotenv/config';
import { z } from 'zod';

const configSchema = z.object({
    PORT: z.string().default('3000'),
    DB_PATH: z.string().default('./default-database.sqlite'),
});

const _config = configSchema.safeParse({
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_PATH: process.env.DB_PATH,
});

if (!_config.success) {
    console.error('❌ Invalid environment variables:', JSON.stringify(_config.error.format(), null, 4));
    process.exit(1);
}

export const config = _config.data;