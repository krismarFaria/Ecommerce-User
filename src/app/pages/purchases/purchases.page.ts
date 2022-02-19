import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PurchasesDetailsComponent } from 'src/app/components/purchases-details/purchases-details.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage implements OnInit {

  purchases = [];
  uid: string;
  waiting: boolean;

  user = {} as User;
  constructor(private firebaseService: FirebaseService,
     private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));  
  }
  ionViewDidEnter() {
    this.getPurchases();
  }

  getPurchases() {
    this.waiting = true;
    this.firebaseService.getCollectionConditional('purchases',
      ref => ref.where('idUser', '==', this.user.id)).subscribe(data => {
        
        this.waiting = false;

        this.purchases = data.map(e => {
          return {
           
            id: e.payload.doc.id,
            date: e.payload.doc.data()['date'],
            products: e.payload.doc.data()['products'],
            image: e.payload.doc.data()['image'],
            total: e.payload.doc.data()['total']
          };
        });


      });
  }

  async purchasesDetail(purchases) {
    const modal = await this.modalController.create({
      component: PurchasesDetailsComponent,
      componentProps: { p: purchases }
    });

    await modal.present();

  }




}
