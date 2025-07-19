import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { ILikeItComponent } from './components/i-like-it/i-like-it.component';
import { SuggestArtistComponent } from './components/suggest-artist/suggest-artist.component';
import { HomeComponent } from './components/home/home.component';
import { BtnLikeItComponent } from './components/btn-like-it/btn-like-it.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarraComponent } from './components/nav-barra/nav-barra.component';
@NgModule({
  declarations: [
    AppComponent,
    SongsListComponent,
    ILikeItComponent,
    SuggestArtistComponent,
    HomeComponent,
    BtnLikeItComponent,
    SuggestArtistComponent,
    NavBarraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
