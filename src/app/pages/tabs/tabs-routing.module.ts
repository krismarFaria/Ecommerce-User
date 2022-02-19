import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[

      {
        path: '',
        redirectTo: 'tabs',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then( m => m.HomePageModule)
      },
     
      {
        path: 'profile',
        loadChildren: () => import('../../pages/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'purchases',
        loadChildren: () => import('../../pages/purchases/purchases.module').then( m => m.PurchasesPageModule)
      },
      {
        path: 'home/shopping-cart',
        loadChildren: () => import('../../pages/shopping-cart/shopping-cart.module').then( m => m.ShoppingCartPageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../../pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
