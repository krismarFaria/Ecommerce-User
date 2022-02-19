import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  waiting: boolean;
  favorites = [];
  favPage = true;
  uid: string;
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.uid = localStorage.getItem('uid');
  }

  ionViewDidEnter() {
    this.getFavorites()
  }
  getFavorites() {
    this.waiting = true;
    this.firebaseService.getCollectionConditional('favorites',
    ref => ref.where('idUser', '==', this.uid)).subscribe(data => {
      
      this.waiting = false;
      this.favorites = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          price: e.payload.doc.data()['price'],
          image: e.payload.doc.data()['image'],
          description: e.payload.doc.data()['description']


        };
      });



    });
  }
}
