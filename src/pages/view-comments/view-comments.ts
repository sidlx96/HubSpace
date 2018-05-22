import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {Shop} from '../../models/shop';

/**
 * Generated class for the ViewCommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-view-comments',
  templateUrl: 'view-comments.html',
})
export class ViewCommentsPage {

  shop:Shop;
  comments:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shop=this.navParams.get('key');
    this.comments=this.shop.shopComments;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewCommentsPage');
  }

}
