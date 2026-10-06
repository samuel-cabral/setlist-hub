import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SongsService } from './songs.service';

@Component({
  selector: 'app-songs-page',
  imports: [ReactiveFormsModule],
  templateUrl: './songs-page.html',
  styleUrl: './songs-page.scss',
})
export class SongsPage implements OnInit {
  private readonly fb = inject(FormBuilder).nonNullable;
  protected readonly songsService = inject(SongsService);

  protected readonly form = this.fb.group({
    title: ['', Validators.required],
    artist: ['', Validators.required],
    key: ['', Validators.required],
    bpm: [90, [Validators.required, Validators.min(20), Validators.max(300)]],
  });

  ngOnInit(): void {
    this.songsService.load();
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.songsService.add(this.form.getRawValue());
    this.form.reset({ title: '', artist: '', key: '', bpm: 90 });
  }
}
