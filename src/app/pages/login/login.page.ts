import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';
import { SignUpComponent } from './component/sign-up/sign-up.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  user = {} as User;
  constructor(private formBuilder: FormBuilder,
     private toastController: ToastController, 
     private firebaseService: FirebaseService,
     private modalController: ModalController) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

  }

  Submit() {
    if (this.form.valid) {
      //router(tabs/home)     
      this.Login();
    } else {
      this.Toast('Completa los campos correctamente')
    }

  }


  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }




  async Toast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      position: 'bottom',
      duration: 1000,
      color: 'primary',
    });
    toast.present();


  }


  async Login() {

    const loading = await this.firebaseService.loader().create();
    await loading.present();

    this.firebaseService.Login(this.form.value).then(res => {
  
      this.getUser(res.user.uid);
      
      loading.dismiss();
    }, error => {
      console.log(error);
      loading.dismiss();
    });
  }

  async getUser(uid) {
    const loading = await this.firebaseService.loader().create();
    await loading.present();
    this.firebaseService.getCurrentUser(uid).subscribe(res => {      
      
      this.user.id = uid;
      this.user.username = res['username'];
      this.user.email = res['email'];
      this.user.phoneNumber = res['phoneNumber'];
      this.user.image = res['image'];   
      
      localStorage.setItem('user', JSON.stringify(this.user));

      this.firebaseService.routerLink().navigateByUrl('tabs/home');
      this.firebaseService.Toast('Bienvenid@, ' + this.user.username);
      this.form.reset();
      
      loading.dismiss();
    }, error => {
      console.log(error)      
      loading.dismiss();
    })
  }

  
   
  async signUp() {
    const modal = await this.modalController.create({
    component: SignUpComponent,
    cssClass:'modal'
    });
    await modal.present();
  
  }

}
