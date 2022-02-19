import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';





@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {} as User;
  waiting: boolean;
 

  constructor(private modalCtrl: ModalController, 
    private firebaseService: FirebaseService) { }

  ngOnInit() {
    
  }

  async abrirModal() {

    const modal = await this.modalCtrl.create({
      component: EditarPerfilComponent,
      componentProps: {user: this.user}
        });

    await modal.present();
  }

  logout() {
    this.firebaseService.logout()
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));      
  }



}
