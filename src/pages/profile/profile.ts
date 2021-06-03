import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ModalPage } from '../modal/modal';
import { ParamsPage } from '../params/params';
import { UpdatePage } from '../update/update';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  data=[];
  constructor(public sqlite:SQLite ,public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController) {
  
      this.getData()
    
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter() {
    this.getData()
    }

  
  getMail(){
    return localStorage.getItem('email')
  }

  getName(){
    return localStorage.getItem('nom')+" "+ localStorage.getItem('prenom')
  }

  presentModal() {
    const modal = this.modalCtrl.create(ModalPage);
    modal.onDidDismiss(data => {
      this.getData();
    });
    modal.present();
  }

  toupdate(id,type,titre,description,prix){
    let modal = this.modalCtrl.create(UpdatePage,{id:id,type:type,titre:titre,description:description,prix});
    modal.onDidDismiss(data => {
      this.getData();
    });
    modal.present();
  }

  getData(){
    this.data=[]
    this.sqlite.create({
      name:'data.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('select id ,titre ,type , description , prix , nom , prenom , email from annonce a, user u where a.idc=u.idc and a.idc= (?)',[[localStorage.getItem('id')]]).then((res)=>{
        console.log(res.rows.item(0));
        for (let index = 0; index < res.rows.length; index++) {
          this.data.push(res.rows.item(index));
        }
        
      }).catch(e=>console.log(e)
      )
    })
    .catch(e=>console.log(e))
  }

  delete(id){
    this.sqlite.create({
      name:'data.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('delete from annonce where id= (?)',[[id]]).then((res)=>{
        this.getData()
      }).catch(e=>console.log(e)
      )
    })
   // })
    .catch(e=>console.log(e))
  }
  checkUser(){
    if(localStorage.getItem('email')!=null)
      return true;
      else return false;
  }

}
