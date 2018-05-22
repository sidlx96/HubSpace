import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';

import { HomePage } from '../pages/home/home';
import { AddShopPage } from '../pages/add-shop/add-shop';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;
  @ViewChild(Nav) nav: Nav;
  constructor(private auth: AuthService,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.auth.afAuth.authState
				.subscribe(
					user => {
						if (user) {
							this.rootPage = HomePage;
						} else {
							this.rootPage = LoginPage;
						}
					},
					() => {
						this.rootPage = LoginPage;
					}
				);
  }
  login() {
		
		this.auth.signOut();
		this.nav.setRoot(LoginPage);
	}

	logout() {
		
		this.auth.signOut();
		this.nav.setRoot(HomePage);
	}
  goToHome(){
    this.nav.setRoot(HomePage);
  }
  goToAddShop(){
    this.nav.push(AddShopPage);
  }
}

