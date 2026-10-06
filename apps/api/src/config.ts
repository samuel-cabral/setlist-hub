import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().min(1).default('mongodb://localhost:27017/setlist-hub'),
  PORT: z.coerce.number().int().positive().default(3000),
});

export const config = envSchema.parse(process.env);
