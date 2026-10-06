import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <header class="top"><h1>Setlist Hub</h1></header>
    <main><router-outlet /></main>
  `,
  styleUrl: './app.scss',
})
export class App {}
