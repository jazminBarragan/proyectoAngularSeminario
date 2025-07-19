import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyLikesService } from '../../services/my-likes.service';
import { Song } from '../../components/songs-list/song';

@Component({
  selector: 'app-btn-like-it',
  standalone: false,
  templateUrl: './btn-like-it.component.html',
  styleUrl: './btn-like-it.component.scss'
})
//Componente: observador
export class BtnLikeItComponent {
  constructor(private likeList:MyLikesService){}
  @Input()
  song: Song = {name: '', artist: '', gender:'', topMundial: 0, like: false }; 

  //cuando el usuario da me gusta a una cancion (aprieta el emoji), este cambia de color
  //y se agrega a la lista de canciones que le gustan (service)
  like() : void {
    this.likeList.likeAcction(this.song); //impelmenta servicio
  }
}
