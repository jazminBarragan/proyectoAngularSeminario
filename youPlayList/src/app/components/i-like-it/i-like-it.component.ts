import { Component } from '@angular/core';
import { MyLikesService } from '../../services/my-likes.service';
import { Song } from '../../components/songs-list/song';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-i-like-it',
  standalone: false,
  templateUrl: './i-like-it.component.html',
  styleUrl: './i-like-it.component.scss'
})
//Mis 'me gusta' == El carrito de compras se suscribe a los cambios que sufre el carritos
export class ILikeItComponent {
  likeListSubscription!: Subscription;

  constructor(private listLikes : MyLikesService){
    this.likeListSubscription = this.listLikes.likeList$.subscribe(
      list => this.likeList = list);
  }

  likeList : Song [] = [];

  ngOnDestroy(): void {
  if (this.likeListSubscription) {
    this.likeListSubscription.unsubscribe();
  }
}
}
