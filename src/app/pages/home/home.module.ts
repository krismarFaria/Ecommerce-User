import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ComponentsModule } from 'src/app/components/components.module';

import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { ProductsCardComponent } from './components/products-card/products-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [HomePage,ProductsDetailsComponent, ProductsCardComponent ]
})
export class HomePageModule {}
