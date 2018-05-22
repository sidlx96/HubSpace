import { Component } from '@angular/core';
import { NavController,AlertController,NavParams ,NavPush} from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Shop} from '../../models/shop';
import {ViewCommentsPage} from '../view-comments/view-comments';
import { ViewLikePage } from '../view-like/view-like';


/**
 * Generated class for the ViewShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-view-shop',
  templateUrl: 'view-shop.html',


})
export class ViewShopPage {
  shop:any;
  index:string;
  constructor(public afDB:AngularFireDatabase, public navCtrl: NavController,public authProvider:AuthService, public navParams: NavParams,public alertCtrl:AlertController) {
    this.shop=this.navParams.get('key');
    

  }

  ionViewDidLoad() {
    
    console.log(this.navParams.get('key').shopContact);
  }

  viewCommentPage(shop){
    this.navCtrl.push(ViewCommentsPage,{key:shop});
  }
  viewLikePage(shop:Shop){
    this.navCtrl.push(ViewLikePage,{key:shop});

  }

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
            console.log(data.comment);
            console.log(this.authProvider.getEmail());
            let value = {'comment':data.comment,'user':this.authProvider.getEmail()};
            // 

            
            console.log(shop.shopComments,value,shop);
             shop.shopCommentsCount+=1;
             shop.shopComments.push(value);
             console.log(shop);

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
 
 
  
 addLike(shop:any){
 console.log('shop clicked');
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
 
 
 
 
 
 
 console.log(shop);
 
 this.afDB.list('/shopsList').update(shop.shopName,shop)
             .then(()=>{
                console.log("Likes Added");
             })
             .catch((err)=>{
               console.log(err);
               
             });
 
 
 }


}
