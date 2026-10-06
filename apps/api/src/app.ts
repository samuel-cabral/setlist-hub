import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import { createSongSchema } from './song.schema.js';
import { Song } from './song.model.js';

export function createApp() {
  const app = express();
  app.use(cors({ origin: 'http://localhost:4200' }));
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/songs', async (_req, res) => {
    const songs = await Song.find().sort({ createdAt: -1 }).lean();
    res.json(songs.map(({ _id, title, artist, key, bpm }) => ({ id: String(_id), title, artist, key, bpm })));
  });

  app.post('/songs', async (req, res) => {
    const parsed = createSongSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: 'Validation failed', issues: parsed.error.issues });
      return;
    }
    const song = await Song.create(parsed.data);
    res.status(201).json({ id: String(song._id), ...parsed.data });
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}
