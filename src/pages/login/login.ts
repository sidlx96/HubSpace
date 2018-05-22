import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
import {GooglePlus} from '@ionic-native/google-plus';
import firebase from 'firebase';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loginForm: FormGroup;
	loginError: string;

	constructor(
		private googleplus:GooglePlus,
		private navCtrl: NavController,
		private auth: AuthService,
		fb: FormBuilder
	) {
		this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
	}

  login() {
		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.setRoot(HomePage),
				error => this.loginError = error.message
			);
    }

  signup(){
    this.navCtrl.push(SignupPage);
  }

  loginWithGoogle() {
  // this.auth.signInWithGoogle()
  //   .then(
  //     () => this.navCtrl.setRoot(HomePage),
  //     error => console.log(error.message)
	//   );
	this.googleplus.login({
		'webClientID':'221228370247-t7ibdtkr7ubuprb2dv0l10iif84v6da6.apps.googleusercontent.com',
		offline:true
	}).then((res)=>{
		firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
		.then(()=>{
			this.navCtrl.setRoot(HomePage)
		}).catch((err)=>{
			alert("Login Failed");
		})

	})
	
	}
	forgetPassword(){
		this.navCtrl.push(ResetPasswordPage);
	}

}
