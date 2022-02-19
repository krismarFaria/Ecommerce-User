import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-purchases-details',
  templateUrl: './purchases-details.component.html',
  styleUrls: ['./purchases-details.component.scss'],
})
export class PurchasesDetailsComponent implements OnInit {

@Input() p;

cartItemCount: BehaviorSubject<number>
constructor() { }

ngOnInit() {

}



}
