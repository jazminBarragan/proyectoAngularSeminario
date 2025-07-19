import { Component, EventEmitter, inject, Output } from '@angular/core';
import { GenderStateService } from '../../services/gender-state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchStateService } from '../../services/search-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-barra',
  standalone: false,
  templateUrl: './nav-barra.component.html',
  styleUrl: './nav-barra.component.scss'
})
// la barra de navegacion es quien emite los cambios:
// el usuario selecciona un genero y quiere solo las canciones de ese genero.
// la barra de nav se suscribe a la api de canciones para buscar una.

export class NavBarraComponent {
  constructor(private selectGenderService : GenderStateService, private searchState : SearchStateService){ }
  @Output() 
  selectedGenre = new EventEmitter<string>();
  selectedSong = new EventEmitter<string>();
  router = inject(Router);

  selectGender(gender : string){
    console.log(gender);
    this.selectGenderService.selectGender(gender);
    this.selectedGenre.emit(gender);
  }

  fb=inject(FormBuilder);
  form: FormGroup = this.fb.group({
    search: ['']
  });

  searchSong(){
    if(this.form.valid){
      console.log(this.form.value.search);
      let data = this.form.value.search;
      this.searchState.searchSong(data); //le informamos al servicio que ocurrio un cambio
      this.selectedSong.emit(data);
      this.form.reset();
      this.router.navigate(['/home']);
    }
  }
}
