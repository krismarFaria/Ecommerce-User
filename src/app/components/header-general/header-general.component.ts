import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-header-general',
  templateUrl: './header-general.component.html',
  styleUrls: ['./header-general.component.scss'],
})
export class HeaderGeneralComponent implements OnInit {

  @Input() title;
  @Input() backButton;
  @Input() backButtonModal;
  @Input() user;
  cartItemCount: BehaviorSubject<number>
  constructor(private modalController: ModalController, 
    private router: Router, 
    private cartService: ShoppingCartService) { }

  ngOnInit() {

    this.cartItemCount = this.cartService.getCartItemCount();
  }

goToCart(){
  this.router.navigateByUrl('tabs/home/shopping-cart');
  if(this.backButtonModal){
    this.modalController.dismiss();
  }
  
}
  close(){
    this.modalController.dismiss();
  }
}
