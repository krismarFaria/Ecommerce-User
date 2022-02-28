import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PurchasesDetailsComponent } from 'src/app/components/purchases-details/purchases-details.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';
import { DatePipe } from '@angular/common';

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
  currentDate = this.datePipe.transform(Date.now(), 'YYYY-MM-dd');


  constructor(private firebaseService: FirebaseService,
     private modalController: ModalController,
     private datePipe: DatePipe) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));  
  }

  
  ionViewDidEnter() {
    this.getPurchasesFromDate(this.currentDate);
  }

  

  formatDate(event) {
    const date = this.datePipe.transform(event.target.value, 'YYYY-MM-dd');   
    this.getPurchasesFromDate(date);
  }

  
  getPurchasesFromDate(date) {
    this.waiting = true;
    this.firebaseService.getCollectionConditional('purchases',
      ref => ref.where('date', '==', date)
      .where('idUser', '==', this.user.id)).subscribe(data => {
        this.waiting = false;

        this.purchases = data.map(e => {
          return {
            id: e.payload.doc.id,
            date: e.payload.doc.data()['date'],
            hour: e.payload.doc.data()['hour'],
            products: e.payload.doc.data()['products'],
            image: e.payload.doc.data()['image'],
            total: e.payload.doc.data()['total']
          };
        });


      }, error => {

      })
  }


  async purchasesDetail(purchases) {
    const modal = await this.modalController.create({
      component: PurchasesDetailsComponent,
      componentProps: { p: purchases }
    });

    await modal.present();

  }




}
