import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


import {  AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import {Shop} from '../../models/shop';



/**
 * Generated class for the AddShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-add-shop',
  templateUrl: 'add-shop.html',
})
export class AddShopPage {

  

  captureDataUrl: string;
  alertCtrl: AlertController;

  // @Input('useURI') useURI: Boolean = true;
   
 
  shop:Shop = new Shop();
  constructor(private database: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,
    alertCtrl: AlertController,private camera: Camera) {
      this.alertCtrl=alertCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddshopPage');
  }

  getPicture(sourceType){
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    };

    this.camera.getPicture(cameraOptions)
     .then((captureDataUrl) => {
       this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
    }, (err) => {
        console.log(err);
    });
  }  

  submit(){
     this.shop.shopImage=this.captureDataUrl;
      this.shop.shopCommentsCount=0;
      this.shop.shopLikesCount=0;
      this.shop.shopComments=[];
      this.shop.shopLikes=[];
      this.shop.shopComments.push({'comment':'testcomment','user':'admin'});
      this.shop.shopLikes.push({'like':true,'user':'admin'});
      
      this.database.list('shopsList').update(this.shop.shopName,this.shop);
    this.shop = new Shop();
    this.navCtrl.push(HomePage);

    
     
  }

}
