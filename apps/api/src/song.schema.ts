import { z } from 'zod';

export const createSongSchema = z.object({
  title: z.string().trim().min(1).max(120),
  artist: z.string().trim().min(1).max(120),
  key: z.string().trim().min(1).max(10),
  bpm: z.number().int().min(20).max(300),
});

export type CreateSongInput = z.infer<typeof createSongSchema>;
