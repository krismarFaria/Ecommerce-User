import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';





@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  imgLoaded = false;
  user = {} as User;
  waiting: boolean;
  selectedFile;
  form: FormGroup;

  constructor(private modalCtrl: ModalController, 
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
   
  
  }

 ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));    
    
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

 



}
