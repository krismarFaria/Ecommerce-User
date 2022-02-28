import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  user = {} as User;
  @Input() backButton;
  @Input() backButtonModal;
  constructor(private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private datePipe: DatePipe,
    private router: Router,
    private modalController: ModalController) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      email: [''.toLowerCase(), [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      username: [''.toLowerCase(), [Validators.required, Validators.minLength(4)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(6)]],
      creationDate: ['', [Validators.required]],
    });

  }

  Submit() {
    this.creationDate.setValue(this.datePipe.transform(Date.now(), 'YYYY-MM-dd'))
    if (this.form.valid) {
      this.CreateUserAuth();

    } else {
      this.Toast('Completa los campos correctamente')
    }

  }



  async CreateUserAuth() {
    
    const loading = await this.firebaseService.loader().create();
    await loading.present();

    this.firebaseService.CreateUserAuth(this.form.value).then(res => {

      this.CreateUserDB(res.user.uid);

      loading.dismiss();
    }, error => {
      console.log(error);
      loading.dismiss();
    });
  }



  async CreateUserDB(id) {

    const loading = await this.firebaseService.loader().create();
    await loading.present();

    this.firebaseService.CreateUserDB(this.form.value, id).then(res => {
      this.getUser(id);

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

      console.log(JSON.stringify(this.user));

      localStorage.setItem('user', JSON.stringify(this.user));
      this.firebaseService.routerLink().navigateByUrl('tabs/home');
      this.firebaseService.Toast('Bienvenid@ ' + this.user.username);
      this.modalController.dismiss();
      this.form.reset();

      loading.dismiss();
    }, error => {
      console.log(error);
      loading.dismiss();
    })
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get username() {
    return this.form.get('username');
  }
  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get creationDate() {
    return this.form.get('creationDate');
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
    
  close(){
    this.modalController.dismiss();
  }

}
