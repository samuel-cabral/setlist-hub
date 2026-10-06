export interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  bpm: number;
}

export type NewSong = Omit<Song, 'id'>;
