import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ViewShopPage } from '../view-shop/view-shop';
import {Comments} from '../../models/comments';
import {Shop} from '../../models/shop';
import { ViewCommentsPage } from '../view-comments/view-comments';
import { ViewLikePage } from '../view-like/view-like';

/**
 * Generated class for the FilterDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-filter-data',
  templateUrl: 'filter-data.html',
})
export class FilterDataPage {
shops:any;
alertCtrl:AlertController;
iconName:string;
params:any;
  
  
constructor(
  alertCtrl: AlertController,
  public navParams: NavParams,
  public navCtrl: NavController,
  public authProvider: AuthService,
  private afDB: AngularFireDatabase) {
   // this.shops =this.afDB.list('shopList').valueChanges;
    
    this.alertCtrl = alertCtrl;
    
    this.shops=this.navParams.get('key');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterDataPage');
  }
  viewPage(shop){
    this.navCtrl.push(ViewShopPage,{key:shop});
  }
  viewCommentPage(shop:Shop){
    this.navCtrl.push(ViewCommentsPage,{key:shop});

  }
  viewLikePage(shop:Shop){
    this.navCtrl.push(ViewLikePage,{key:shop});

  }
  

  commentClickedState:boolean=false;

  

  
  commentClicked(shop:any){
    

    let prompt = this.alertCtrl.create({
      title: 'Add Comment',
      message: "Add Comment",
      inputs: [
        {
          name: 'comment',
          placeholder: 'Comment'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
           
            let value = {'comment':data.comment,'user':this.authProvider.getEmail()};
            // 

            
           
             shop.shopCommentsCount+=1;
             shop.shopComments.push(value);
             
            this.afDB.list('/shopsList').update(shop.shopName,shop)
            .then(()=>{
               console.log("Comment Added");
            })
            .catch((err)=>{
              console.log(err);
              
            });

           // this.shops.update(shop.id,shop);


          }
        }
      ]
    });
    prompt.present();
  }

 likeCheck(shop):boolean{
   let logUser=this.authProvider.getEmail();
  for(let like of shop.shopLikes){
    if(like.user==logUser && like.like==true){
     
    return true;
    }
  }
    return false;

}


 
addLike(shop:any,index){
 
let logUser=this.authProvider.getEmail();

let check=this.likeCheck(shop);
let valueLike = {'like':true,'user':logUser};
let valueDislike = {'like':false,'user':logUser};

if(check==false){
  
  shop.shopLikesCount +=1;

shop.shopLikes.push(valueLike);

}
else{

  if(shop.shopLikesCount>0){
  shop.shopLikesCount -=1;
  
shop.shopLikes.splice(shop.shopLikes.indexOf(valueLike)-1);


  }
  shop.shopLikes.push(valueDislike);
}
this.afDB.list('/shopsList').update(shop.shopName,shop)
            .then(()=>{
               console.log("Likes Added");
            })
            .catch((err)=>{
              console.log(err);
              
            });


}


}
