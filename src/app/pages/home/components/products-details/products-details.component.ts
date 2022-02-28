import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from 'src/app/models/product.model';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit {

  @Input() p: Product;
  @Input() favPage;
  favorites = [];
  addedFav: boolean;
  user = {} as User;
  quantity = 1;

  constructor(private cartService: ShoppingCartService,
    private modalController: ModalController,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    
    if(!this.favPage){
     this.getFavorites(); 
    }else{
      this.addedFav = true;
    }
      
       
  }

  AddProduct() {
    
    this.cartService.addProduct(this.p, this.quantity);
    this.firebaseService.Toast('Se agregó el producto correctamente');
  
    this.modalController.dismiss();
  }

  increaseQuantity() {
    this.quantity++;
    
  }

  decreaseQuantity() {
    if (this.p.quantity > 1) {
      this.quantity--;
    }

  }

  getFavorites() {
    this.addedFav = false;
    this.firebaseService.getCollectionConditional('favorites',
    ref => ref.where('idUser', '==', this.user.id)).subscribe(data => {
     
      this.favorites = data.map(e => {
        return {
          id: e.payload.doc.data()['id']
        };
      });
    
      
      for (let f of this.favorites) {
        if (f.id === this.p.id) {
          this.addedFav = true;
          break;
        }
      }

    });
  }


  async addOrRemoveFavorite() {
    if (this.addedFav) {
      const loading = await this.firebaseService.loader().create({
        spinner: 'bubbles'
      });
      await loading.present();
      this.firebaseService.removeFavorite(this.p.id).then(res => {
        this.addedFav = false;
       
        loading.dismiss();
      }, error => {
        console.log(error);
        loading.dismiss();
      })
    } else {

      this.p.idUser = this.user.id;
      const loading = await this.firebaseService.loader().create({
        spinner: 'bubbles'
      });
      await loading.present();

      this.firebaseService.addToCollectionById('favorites',this.p).then(res => {
        this.addedFav = true;
        loading.dismiss();
      }, error => {
        console.log(error);
        loading.dismiss();
      })

    }
  }

}
