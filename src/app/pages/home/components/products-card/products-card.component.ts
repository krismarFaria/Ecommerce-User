import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import { ProductsDetailsComponent } from '../products-details/products-details.component';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.scss'],
})
export class ProductsCardComponent implements OnInit {
  cart = []
  productService: any;
  @Input() products;
  @Input() waiting;
  @Input() favPage;
  
  constructor(private modalController: ModalController,
    private cartService: ShoppingCartService,
    private firebaseService: FirebaseService) { }

  ngOnInit() {

  }
  async productDetail(product) {
    const modal = await this.modalController.create({
      component: ProductsDetailsComponent,
      componentProps: { p: product,
                        favPage: this.favPage }
    });

    await modal.present();

  }

  async removeFavorites(id) {
    const loading = await this.firebaseService.loader().create({
      spinner: 'bubbles'
    });
    await loading.present();

    this.firebaseService.removeFavorite(id).then(res => {
      console.log(res);
      loading.dismiss();
    }, error => {
      console.log(error);
      loading.dismiss();

    })
  }

}
