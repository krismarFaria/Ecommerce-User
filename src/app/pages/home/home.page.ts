import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  marketing = [];
  products = [];
  categories = [];
  user = {} as User;
  op = {
    slidesPerView: 4.3,
    
  };

  option = {
    slidesPerView: 1,
    autoplay: {delay:2500}
  };

  waiting: boolean;
  waitingCategories: boolean;

  categoryId
  constructor(private cartService: ShoppingCartService,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getCategories();
 
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  

  getCategories() {
   this.waitingCategories = true;
    this.firebaseService.getCollection('categories').subscribe(data => {
    this.waitingCategories = false;
      this.categories = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          image: e.payload.doc.data()['image'],

        };
      });

   
     this.getProducts(this.categories[0].id)
    }, error => {

    })
  }

  getProducts(categoryId) {
    this.categoryId = categoryId;
    this.waiting = true;
    this.firebaseService.getCollectionConditional('products', ref => ref.where('categoryId', '==', this.categoryId)).subscribe(data => {
      this.waiting = false;
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          price: e.payload.doc.data()['price'],
          image: e.payload.doc.data()['image'],
          description: e.payload.doc.data()['description']
        };
      });
    }, error => {

    })
  }


}
