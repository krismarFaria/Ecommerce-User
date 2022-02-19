import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss'],
})
export class MarketingComponent implements OnInit {
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
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {

    this.getMarketing()
  }


  getMarketing() {
    this.waiting = true;
    this.firebaseService.getCollection('marketing').subscribe(data => {
      this.waiting = false;
      this.marketing = data.map(e => {
        return {
          description: e.payload.doc.data()['description'],
          name: e.payload.doc.data()['name'],
          image: e.payload.doc.data()['image']

        };
      });

    }, error => {

    })
  }


}
