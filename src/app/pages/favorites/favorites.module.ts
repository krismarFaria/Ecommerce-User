import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesPageRoutingModule } from './favorites-routing.module';

import { FavoritesPage } from './favorites.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProductsCardComponent } from '../home/components/products-card/products-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FavoritesPage, ProductsCardComponent]
})
export class FavoritesPageModule {}
