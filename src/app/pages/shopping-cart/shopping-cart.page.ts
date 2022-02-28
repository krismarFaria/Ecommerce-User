import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PaymentComponent } from 'src/app/components/payment/payment.component';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Products } from 'src/app/services/products';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  waiting: boolean;
  cart = []
  productService: any;
  products = [];
  categoryId
  
  constructor(private cartService: ShoppingCartService, 
    private modalController: ModalController,
     private toastController: ToastController,
     private firebaseService: FirebaseService) { }

  ngOnInit() {
    
    this.cart = this.cartService.getCart();   
  }

  increaseProduct(product) {
    this.cartService.addProduct(product, 1);
  }


  decreaseProduct(product) {
    this.cartService.decreaseProduct(product);
  }


removeProduct(product){
this.cartService.removeProduct(product);
}


  getTotal() {
    return this.cartService.getTotal();
  }

  async payment() {
   
    if (this.cart.length == 0) {

      this.Toast('Añada productos al carrito', 'danger');
    } else {
      const modal = await this.modalController.create({
        component: PaymentComponent,
      });

      await modal.present();

    }




  }

  async Toast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color
    });
    toast.present();
  }


}
