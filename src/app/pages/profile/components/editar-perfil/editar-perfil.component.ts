import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent implements OnInit {
  form: FormGroup;
  @Input() user: User;
  selectedFile;
  imgLoaded = false;

  constructor(private formBuilder: FormBuilder,
        private firebaseService: FirebaseService,
    private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.user.id);

    this.form = this.formBuilder.group({
      id: [this.user.id],
      username: [this.user.username, [Validators.required]],
      image: [this.user.image],

    });

  }


  Submit() {
    if (this.form.valid) {
      this.editProfile();
    } else {
      this.firebaseService.Toast('Completa los campos correctamente')
    }

  }




  async chooseImage(event) {
    setTimeout(() => {
      this.imgLoaded = true;
    }, 2000);
    this.selectedFile = event.target.files;
    this.image.setValue(await this.firebaseService.uploadProfilePhoto(Date.now().toString(), this.selectedFile));
  }


  async editProfile() {

    const loading = await this.firebaseService.loader().create();
    await loading.present();

    this.firebaseService.UpdateCollection('users', this.form.value).then(res => {

      this.user.username = this.username.value;
      this.user.image = this.image.value;

      localStorage.setItem('user', JSON.stringify(this.user));
      this.firebaseService.Toast('El usuario fue actualizado con exito');
      this.modalController.dismiss();
      loading.dismiss();
    }, error => {
      this.firebaseService.Toast('Ha ocurrido un error');
      loading.dismiss();
    })

  }




  validator() {

    if (!this.form.valid) {
      this.firebaseService.Toast('Completa los campos correctamente')
      return false;
    }

    return true;
  }

  get username() {
    return this.form.get('username');
  }

  get image() {
    return this.form.get('image');
  }

}
