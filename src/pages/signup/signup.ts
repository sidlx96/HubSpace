import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
	selector: 'as-page-signup',
	templateUrl: './signup.html'
})
export class SignupPage {
	signupError: string;
	form: FormGroup; 

	constructor(
		fb: FormBuilder,
		private navCtrl: NavController,private database: AngularFireDatabase,
    private auth: AuthService
	) {
		this.form = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
			firstName: ['', Validators.compose([Validators.required])],
			lastName: ['', Validators.compose([Validators.required])],
			username: ['', Validators.compose([Validators.required])],
			phoneNumber: ['', Validators.compose([Validators.required,Validators.minLength(10)])],
			gender: ['', Validators.compose([Validators.required])], 
		});
  }

  signUp() {
		let data = this.form.value;
		console.log(data);
		//

		let credentials = {
			email: data.email,
			password: data.password
		};
		console.log(data);
		this.auth.signUp(credentials).then(
			() => 
			{
				this.database.list('/usersData').push(data);
				this.navCtrl.setRoot(HomePage),
			error => this.signupError = error.message
			});
  }
}
