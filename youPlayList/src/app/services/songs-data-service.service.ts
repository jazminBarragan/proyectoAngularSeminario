import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Song } from '../components/songs-list/song';

// este servicio nos trae las canciones mediante una api.
const URL = 'https://68769507814c0dfa653c9a54.mockapi.io/api/songs/songs';

@Injectable({
  providedIn: 'root'
})
export class SongsDataServiceService {

  constructor(private http: HttpClient) { }

  //nos devuelve un observable - todas las canciones
  public getAll() : Observable<Song[]>{
    return this.http.get<Song[]>(URL);
  }

  //nos devuelve un observable - canciones filtradas por genero
  public getSongsByGender(gender: string): Observable<Song[]> {
    return this.http.get<Song[]>(URL).pipe(
      map(songs => songs.filter(song => song.gender === gender))
  );
  }
  
  public getSongByName(name : string){
    return this.http.get<Song[]>(URL).pipe(
      map(songs => songs.filter(song => song.name === name))
  );

  }
  public addSong(data: any){
    return this.http.post(URL, data);
  }
}
