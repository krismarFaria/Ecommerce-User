import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Purchase } from 'src/app/models/purchase.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Payment } from 'src/app/models/payment.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  paymentMethod = '';
  creditCardform: FormGroup;
  purchase = {} as Purchase;
  card: any;
  paymentData = {} as Payment;


  constructor(private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private cartService: ShoppingCartService,
    private modalController: ModalController,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {

    this.creditCardform = this.formBuilder.group({

      name: [''.toLowerCase(), [Validators.required]],
      cardNumber: ['', [Validators.maxLength(16)]],
      expireDate: ['', [Validators.required]],
      cvv: ['', [Validators.maxLength(3), Validators.minLength(3)]],
    });

    this.getChange();

  }

  getChange() {

    if (this.paymentData.amountReceive < this.cartService.getTotal()) {
      this.paymentData.change = 0;
    } else {
      this.paymentData.change = this.paymentData.amountReceive - this.cartService.getTotal();
    }


    return this.paymentData.change;
  }


  async submitCreditCard() {

    if (this.creditCardform.valid) {
      this.purchase.idUser = this.firebaseService.UserId();
      this.purchase.date = this.datePipe.transform(Date.now(), 'YYYY-MM-dd');
      this.purchase.hour = this.datePipe.transform(Date.now(), 'h:mm a');
      this.purchase.total = this.cartService.getTotal();
      this.purchase.products = this.cartService.getCart();
      this.purchase.image = this.cartService.getCart()[0].image;
      this.purchase.paymentData = this.creditCardform.value;

      const loading = await this.firebaseService.loader().create({
        spinner: 'bubbles'
      });
      await loading.present();
      this.firebaseService.addToCollection('purchases', this.purchase).then(res => {

        this.firebaseService.routerLink().navigateByUrl('tabs/purchases');
        this.firebaseService.Toast('Se ha generado la compra correctamente');
        this.cartService.removeAll();
        this.creditCardform.reset();
        this.modalController.dismiss();
        loading.dismiss();
      }, error => {
        console.log(error);
        loading.dismiss();
      });



    } else {
      this.firebaseService.Toast('Completa los campos correctamente');
    }

  }
// cash

  async submitCash() {

    if (this.validator()) {
      this.purchase.idUser = this.firebaseService.UserId();
      this.purchase.date = this.datePipe.transform(Date.now(), 'YYYY-MM-dd');
      this.purchase.hour = this.datePipe.transform(Date.now(), 'h:mm a');
      this.purchase.total = this.cartService.getTotal();
      this.purchase.products = this.cartService.getCart();
      this.purchase.image = this.cartService.getCart()[0].image;
      this.purchase.paymentData = this.paymentData;

      const loading = await this.firebaseService.loader().create({
        spinner: 'bubbles'
      });
      await loading.present();
      this.firebaseService.addToCollection('purchases', this.purchase).then(res => {

        this.firebaseService.routerLink().navigateByUrl('tabs/purchases');
        this.firebaseService.Toast('Se ha generado la compra correctamente');
        this.cartService.removeAll();
        this.creditCardform.reset();
        this.modalController.dismiss();
        loading.dismiss();

      }, error => {
        console.log(error);
        loading.dismiss();
      });



    }

  }

  validator() {
    
 if (!this.paymentData.amountReceive) {
      this.firebaseService.Toast('Ingrese el monto');

      return false;
    }

    if (this.paymentData.amountReceive < this.cartService.getTotal()) {
      this.firebaseService.Toast('El monto recibido no puede ser menor al total');

      return false;
    }

   


    return true;
  }


  get name() {
    return this.creditCardform.get('name');
  }

  get cardNumber() {
    return this.creditCardform.get('cardNumber');

  }
  get expireDate() {
    return this.creditCardform.get('expireDate');
  }
  get cvv() {
    return this.creditCardform.get('cvv');
  }

  

  getTotal() {
    return this.cartService.getTotal();
  }


}
