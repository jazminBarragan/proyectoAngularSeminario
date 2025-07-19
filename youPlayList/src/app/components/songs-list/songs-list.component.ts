import { Component } from '@angular/core';
import { Song } from './song';
import { SongsDataServiceService } from '../../services/songs-data-service.service';
import { GenderStateService } from '../../services/gender-state.service';
import { SearchStateService } from '../../services/search-state.service';
import { MyLikesService } from '../../services/my-likes.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-songs-list',
  standalone: false,
  templateUrl: './songs-list.component.html',
  styleUrl: './songs-list.component.scss'
})
export class SongsListComponent {
  private subscriptions = new Subscription;

  constructor(private songsDataService : SongsDataServiceService, 
    private selectGenderService : GenderStateService, 
    private searchState : SearchStateService,
    private likeList: MyLikesService
  ){}
  
songs: Song[] = [];

ngOnInit(): void {
 this.selectGenderService.generoSeleccionado$.subscribe(genero => {
    if (!genero || genero.trim() === '') {
      // Si no hay género seleccionado, mostrar todas
      let subscriptionOne = this.songsDataService.getAll().subscribe(songs => {
        this.songs = this.marcarFavoritas(songs);
      });
      this.subscriptions.add(subscriptionOne);
    } else {
      // Si hay un género, filtrar
      let subscriptionSecond = this.songsDataService.getSongsByGender(genero).subscribe(songs => {
        this.songs = this.marcarFavoritas(songs);
      });
      this.subscriptions.add(subscriptionSecond);
    }
  });
  let subscriptionSearch = this.searchState.searchedSong.subscribe(search =>{
    if(search || search !== '')
    this.songsDataService.getSongByName(search).subscribe(songs => {
      this.songs = this.marcarFavoritas(songs);
    })
  });
  this.subscriptions.add(subscriptionSearch);
}

private marcarFavoritas(songs: Song[]): Song[] {
  let favoritos = this.likeList.getLikeList();
  return songs.map(song => ({
    ...song,
    like: favoritos.some(fav => fav.name === song.name && fav.gender === song.gender)
  }));
}

ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}

}
