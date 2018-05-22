import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewLikePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({ 
  selector: 'page-view-like',
  templateUrl: 'view-like.html',
})
export class ViewLikePage {
shop:any;
likes:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shop=this.navParams.get('key');
    this.likes=this.shop.shopLikes;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewLikePage');
  }

}
