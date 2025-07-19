import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//este servicio mantiene el estado del genero por el que quiere buscar el usuario:
//puede ser '' (trae todas las canciones)
//puede ser : reggaeton, jazz, bachata
//el nav-bar emite el cambio, la songList se suscribe a este servicio para enterarse si hubo algun evento (el user eligio un genero) 

@Injectable({
  providedIn: 'root'
})
export class GenderStateService {

  private _genderSelected:string = '';
  private genderSelected = new BehaviorSubject<string>(this._genderSelected);
  generoSeleccionado$ = this.genderSelected.asObservable(); // a generoSeleccionado$ se suscriben 
                                              // los componentes que quieren usar el servicio
  selectGender(gender: string) {
    this.genderSelected.next(gender);
  }
  //.next emite el cambio que ocurrio
}
