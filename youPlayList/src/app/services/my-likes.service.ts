import { Injectable } from '@angular/core';
import { Song } from '../components/songs-list/song';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MyLikesService {
  private _likeList$ = new BehaviorSubject<Song[]>([]);
  public likeList$ = this._likeList$.asObservable();
  constructor() { }

  likeAcction(song : Song){
    let arr= this._likeList$.getValue();
    if((arr.some(s => s.name === song.name && s.gender === song.gender)) === false){
      song.like = true;
      arr.push(song);
      this._likeList$.next(arr);
    }else{
    let indice = arr.findIndex(s => s.name === song.name);
    if(indice != -1){
      song.like = false;
      arr.splice(indice, 1);
    }
    this._likeList$.next(arr);
    }
  }

  getLikeList(): Song[] {
    let arr = this._likeList$.getValue();
  return arr;
  }
}
