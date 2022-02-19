import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Purchase } from '../models/purchase.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {



  constructor(private auth: AngularFireAuth,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router) { }


  logout() {
    this.auth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('uid');
      this.router.navigate(['login']);
    });
  }

  getCollection(collection) {
    return this.db.collection(collection).snapshotChanges();
  }

  getCollectionConditional(collection, condition) {
    return this.db.collection(collection, condition).snapshotChanges();
  }

  addToCollection(collection, object) {
    return this.db.collection(collection).add(object);
  }

  addToCollectionById(collection, object) {
    return this.db.collection(collection).doc(object.id).set(object);
  }

  Login(user: User) {
    return this.auth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  UserId() {
    return this.auth.auth.currentUser.uid;
  }

  CreateUserAuth(user: User) {
    return this.auth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }


  CreateUserDB(user, id) {
    return this.db.collection('users').doc(id).set(user)
  }

  Database() {
    return this.db;
  }


  getCurrentUser(uid) {
    return this.db.doc('users/' + uid).valueChanges();
  }

  removeFavorite(id) {
    return this.db.collection('favorites').doc(id).delete();
  }

  loader() {
    return this.loadingController;
  }

  UpdateCollection(collection, object) {
    return this.db.collection(collection).doc(object.id).update(object);
  }
  

  async Toast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: 'primary',
      position: 'middle'
    });
    toast.present();
  }

  routerLink() {
    return this.router;
  }


  async uploadProfilePhoto(id, file): Promise<any> {

    if (file && file.length) {
      try {
        const loading = await this.loadingController.create();
        await loading.present();

        const task = await this.storage.ref(id).child(id).put(file[0])
        loading.dismiss();
        return this.storage.ref(`${id}/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

}
