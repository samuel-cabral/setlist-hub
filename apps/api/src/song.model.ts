import { Schema, model } from 'mongoose';

const songSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    key: { type: String, required: true, trim: true },
    bpm: { type: Number, required: true, min: 20, max: 300 },
  },
  { timestamps: true },
);

export const Song = model('Song', songSchema);
