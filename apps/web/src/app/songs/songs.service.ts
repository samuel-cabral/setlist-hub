import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { NewSong, Song } from './song';

const API_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class SongsService {
  private readonly http = inject(HttpClient);

  private readonly _songs = signal<Song[]>([]);
  private readonly _error = signal<string | null>(null);

  readonly songs = this._songs.asReadonly();
  readonly error = this._error.asReadonly();

  load(): void {
    this.http.get<Song[]>(`${API_URL}/songs`).subscribe({
      next: (songs) => {
        this._songs.set(songs);
        this._error.set(null);
      },
      error: () => this._error.set('Nao foi possivel carregar as musicas. A API esta rodando?'),
    });
  }

  add(song: NewSong): void {
    this.http.post<Song>(`${API_URL}/songs`, song).subscribe({
      next: (created) => {
        this._songs.update((list) => [created, ...list]);
        this._error.set(null);
      },
      error: () => this._error.set('Nao foi possivel salvar a musica.'),
    });
  }
}
