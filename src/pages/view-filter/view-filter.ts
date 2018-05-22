import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Shop} from '../../models/shop';
import { filter } from 'rxjs/operator/filter';
import { ViewShopPage } from '../view-shop/view-shop';
import { FilterDataPage } from '../filter-data/filter-data';




@Component({
  selector: 'page-view-filter',
  templateUrl: 'view-filter.html',
})
export class ViewFilterPage {

  shops:Observable<Shop[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthService,
    private afDB: AngularFireDatabase) {
      this.shops=this.afDB.list<Shop>('shopsList').valueChanges();

  }
 shopTimings;
 shopDomain;
 shopLocation;
 shopDelivery;
 filterData=[];
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewFilterPage');
  }
  pickTimings(shopTimings){
    this.shopTimings=shopTimings;
    console.log(shopTimings);
  }
  pickDomain(shopDomain){
    this.shopDomain=shopDomain;
  console.log(shopDomain);
  }
  pickLocation(shopLocation){
    this.shopLocation=shopLocation;
    console.log(shopLocation);
    }
    pickDelivery(shopDelivery){
      this.shopDelivery=shopDelivery;
      console.log(shopDelivery);
      }

 applyFilter(){
this.shops.subscribe(item=>{
  item.forEach(element=>{
    if(this.shopLocation===undefined && this.shopDomain===undefined && this.shopDelivery===undefined && this.shopTimings===undefined){
      this.filterData.push(element);
    }
    else if(this.shopLocation===undefined && this.shopDomain===undefined && this.shopDelivery===undefined && this.shopTimings!=undefined){
      if(element.shopWorkingHours===this.shopTimings){
      this.filterData.push(element);
      }
    }
    else if(this.shopLocation===undefined && this.shopDomain===undefined && this.shopDelivery!=undefined && this.shopTimings===undefined){
      if(element.shopDeliveryOption===this.shopDelivery){
      this.filterData.push(element);
      }
    }
    else if(this.shopLocation===undefined && this.shopDomain===undefined && this.shopDelivery!=undefined && this.shopTimings!=undefined){
      if(element.shopDeliveryOption===this.shopDelivery && element.shopWorkingHours===this.shopTimings){
      this.filterData.push(element);
      }
    }
    else if(this.shopLocation===undefined && this.shopDomain!=undefined && this.shopDelivery===undefined && this.shopTimings===undefined){
      if(element.shopDomain===this.shopDomain){
      this.filterData.push(element);
      }
    }
    
    else if(this.shopLocation===undefined && this.shopDomain!=undefined && this.shopDelivery===undefined && this.shopTimings!=undefined){
      if(element.shopDomain===this.shopDomain && element.shopWorkingHours===this.shopTimings){
      this.filterData.push(element);
      }
    }
    
    else if(this.shopLocation===undefined && this.shopDomain!=undefined && this.shopDelivery!=undefined && this.shopTimings===undefined){
      if(element.shopDomain===this.shopDomain && element.shopDeliveryOption===this.shopDelivery){
      this.filterData.push(element);
      }
    }
    
    else if(this.shopLocation===undefined && this.shopDomain!=undefined && this.shopDelivery!=undefined && this.shopTimings!=undefined){
      if(element.shopDomain===this.shopDomain && element.shopDeliveryOption===this.shopDelivery && element.shopWorkingHours===this.shopTimings){
      this.filterData.push(element);
      }
    }
    else if(this.shopLocation!=undefined && this.shopDomain===undefined && this.shopDelivery===undefined && this.shopTimings===undefined){
      if(element.shopLocation===this.shopLocation){
      this.filterData.push(element);
      }
    }
    else if(this.shopLocation!=undefined && this.shopDomain===undefined && this.shopDelivery===undefined && this.shopTimings!=undefined){
      if(element.shopLocation===this.shopLocation && element.shopWorkingHours===this.shopTimings){
      this.filterData.push(element);
      }
    }
    else if(this.shopLocation!=undefined && this.shopDomain===undefined && this.shopDelivery!=undefined && this.shopTimings===undefined){
      if(element.shopLocation===this.shopLocation && element.shopDeliveryOption===this.shopDelivery){
      this.filterData.push(element);
      }
    }
    else if(this.shopLocation!=undefined && this.shopDomain===undefined && this.shopDelivery!=undefined && this.shopTimings!=undefined){
      if(element.shopLocation===this.shopLocation && element.shopDeliveryOption===this.shopDelivery && element.shopWorkingHours===this.shopTimings){
      this.filterData.push(element);
      }
    }
    else if(this.shopLocation!=undefined && this.shopDomain!=undefined && this.shopDelivery===undefined && this.shopTimings===undefined){
      if(element.shopLocation===this.shopLocation && element.shopDomain===this.shopDomain){
      this.filterData.push(element);
      }
    }
    else if(this.shopLocation!=undefined && this.shopDomain!=undefined && this.shopDelivery===undefined && this.shopTimings!=undefined){
      if(element.shopLocation===this.shopLocation && element.shopDomain===this.shopDomain && element.shopWorkingHours===this.shopTimings){
      this.filterData.push(element);
      }
    }
    else if(this.shopLocation!=undefined && this.shopDomain!=undefined && this.shopDelivery!=undefined && this.shopTimings===undefined){
      if(element.shopLocation===this.shopLocation && element.shopDomain===this.shopDomain && element.shopDeliveryOption===this.shopDelivery){
      this.filterData.push(element);
      }
    }
    else{
      if(element.shopLocation===this.shopLocation && element.shopDomain===this.shopDomain && element.shopDeliveryOption===this.shopDelivery&& element.shopWorkingHours===this.shopTimings){
        this.filterData.push(element);
        }

    }

    





  })
  // console.log(this.filterData);
  // this.afDB.list('shopsListFilter').update('0',this.filterData);
  // this.afDB.object('/shopsFilter/data'+0).update(this.filterData);
  this.navCtrl.push(FilterDataPage,{key:this.filterData});
})


}
}
