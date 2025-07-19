import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SongsDataServiceService } from '../../services/songs-data-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-suggest-artist',
  standalone: false,
  templateUrl: './suggest-artist.component.html',
  styleUrl: './suggest-artist.component.scss'
})
export class SuggestArtistComponent {
  private songSubscription?: Subscription;
  constructor(private songsDataService : SongsDataServiceService){}

  fb=inject(FormBuilder);
  form: FormGroup = this.fb.group({
    nameSong: ['', [Validators.required]],
    nameArtist:['', [Validators.required]],
    nameGender:['', [Validators.required]],
    topMundial: ['', [Validators.required]]
  });

  OnSubmit():void{
    if(this.form.valid){
      let data = {
      name: this.form.value.nameSong,
      artist: this.form.value.nameArtist,
      gender: this.form.value.nameGender,
      topMundial: this.form.value.topMundial
    };

      console.log(data);
      this.songSubscription = this.songsDataService.addSong(data).subscribe({
        next: (respuesta) => console.log('Éxito:', respuesta),
        error: (error) => console.error('Error:', error),
      });
    }
    this.form.reset();
  }

  ngOnDestroy(): void {
  this.songSubscription?.unsubscribe();
}
}
