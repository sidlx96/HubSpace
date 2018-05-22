import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from './config';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { AddShopPage } from '../pages/add-shop/add-shop';
import { HomePage } from '../pages/home/home';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ViewShopPage } from '../pages/view-shop/view-shop';
import { ViewCommentsPage } from '../pages/view-comments/view-comments';
import { ViewFilterPage } from '../pages/view-filter/view-filter';
import { FilterDataPage } from '../pages/filter-data/filter-data';
import { ViewLikePage } from '../pages/view-like/view-like';
import {GooglePlus} from '@ionic-native/google-plus';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddShopPage,
    LoginPage,
		SignupPage,
    ResetPasswordPage,
    ViewShopPage,
    ViewCommentsPage,ViewFilterPage,FilterDataPage,ViewLikePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgxErrorsModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireDatabaseModule,
    AngularFireAuthModule
    

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
		SignupPage,
		ResetPasswordPage,
    AddShopPage,
    ViewShopPage,
    ViewCommentsPage,ViewFilterPage,FilterDataPage,ViewLikePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthService,
    Camera,GooglePlus
  ]
})
export class AppModule {}
