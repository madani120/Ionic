import { Component } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { TabsPage } from'../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ParamsPage } from '../pages/params/params';
import { ProfilePage } from '../pages/profile/profile';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  db =new SQLiteObject(new SQLite())
  constructor(public app: App,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private sqlite: SQLite) {
    platform.ready().then(() => {
    
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.createDataIfNotExist();
      statusBar.styleDefault();
      splashScreen.hide();
      setTimeout(() => {
        this.getData()
      }, 1000);
    });
  }

  data:any[]
  getData(){
    this.data=[]
    this.sqlite.create({
      name:'data.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('select id , titre ,type , description , prix , nom , prenom , email from annonce a, user u where a.idc=u.idc',[]).then((res)=>{
        console.log(res.rows.item(0));
        for (let index = 0; index < res.rows.length; index++) {
          this.data.push(res.rows.item(index));
        }
        
      }).catch(e=>console.log(e)
      )
    })
    .catch(e=>console.log(e))
  }

  createDataIfNotExist() {
    this.sqlite.deleteDatabase({
      name: 'data.db',
      location: 'default'
    }).catch(e=>console.log(e)
    )
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("create table user(idc INTEGER PRIMARY KEY, nom VARCHAR(25), prenom VARCHAR(25),email VARCHAR(100), password VARCHAR(50))", {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

      db.executeSql("insert into user values (1,'Tchinda','Abbas','user','123')", {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

        db.executeSql("insert into user values (2,'Madani','Kuete','k.madani@gmail.com','123')", {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

      db.executeSql("create table annonce(id INTEGER PRIMARY KEY AUTOINCREMENT, titre VARCHAR(25),type VARCHAR(20) ,description VARCHAR(100),prix INTEGER, idc INTEGER,FOREIGN KEY(idc) REFERENCES user(idc))", {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

      db.executeSql("insert into annonce (titre,type,description,prix,idc) values ((?),(?),(?),15000,2)", [['BMW '],['Voiture'],['Une BMW a bon prix']])
        .then(() => console.log('Executed insertion'))
        .catch(e => console.log(e));
        console.log("created");
      db.executeSql("insert into annonce (titre,type,description,prix,idc) values ((?),(?),(?),700,1)", [['Villa'],['Appartement'],['villa propre meuble a gammarth ville']])
        .then(() => console.log('Executed insertion'))
        .catch(e => console.log(e));
        this.db=db
    }).catch((error) => {
      console.log(error);

    })
  }

  goToProfile(){
    this.app.getActiveNav().push(ProfilePage)
  }

  goToHome(){
    this.app.getActiveNav().push(HomePage)
  }

  isLoggedIn(){
    if(localStorage.getItem('email')!=null){
      return true;
    }else{
      return false;
    }
  }


}

