import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {

  private _search : string = '';
  search : BehaviorSubject<string> = new BehaviorSubject<string>(this._search);
  searchedSong = this.search.asObservable();

  searchSong(song : string){
    this.search.next(song); //emitir que hubo ese cambio 
  }
}
