import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderGeneralComponent } from './header-general/header-general.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentComponent } from './payment/payment.component';
import { PurchasesDetailsComponent } from './purchases-details/purchases-details.component';
import { MarketingComponent } from './marketing/marketing.component';
import { ProductCardComponent } from './product-card/product-card.component';




@NgModule({


  declarations: [
    HeaderGeneralComponent,    
    ReceiptComponent,    
    PaymentComponent,
    PurchasesDetailsComponent,
    MarketingComponent,
    ProductCardComponent
    ],

  exports:[
     HeaderGeneralComponent,    
     ReceiptComponent,     
     PaymentComponent,
     PurchasesDetailsComponent,
     MarketingComponent,
     ProductCardComponent
    ],


  imports: [
    CommonModule,
     FormsModule, 
     IonicModule, 
     ReactiveFormsModule
  ]

  
})
export class ComponentsModule { }
