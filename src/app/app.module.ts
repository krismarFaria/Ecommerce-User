import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule} from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from "../environments/environment.prod";
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({mode:"md"}), AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  AngularFirestoreModule,AngularFireStorageModule],

  providers: [
    DatePipe,
  
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }, 
                ],
  bootstrap: [AppComponent],
})
export class AppModule {}
