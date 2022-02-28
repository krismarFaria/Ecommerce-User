import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
 
  constructor() { }


  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.quantity, 0);
  }

  addProduct(product: Product, quantity) {
   
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        added = true;
        p.quantity += quantity;        
        break;
      }
    }
    if (!added) { 
      product.quantity = quantity;    
      this.cart.push(product);
    }
   
    this.cartItemCount.next(this.cartItemCount.value + quantity); 

  }

  decreaseProduct(product: Product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.quantity -= 1;
        if (p.quantity == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);

  }

  removeProduct(product: Product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cart.splice(index, 1);
      }
      this.cartItemCount.next(this.cartItemCount.value - p.quantity);
    }

  }

  removeAll() {
    this.cart.splice(0, this.cart.length)
    this.cartItemCount.next(this.cartItemCount.value * 0);
  }

}