import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import {LoginPage } from '../login/login';
import {ParamsPage} from '../params/params'
import { ProfilePage } from '../profile/profile';
@Component({
selector: 'page-tabs',
templateUrl: 'tabs.html'
})
export class TabsPage {
acceuilPage = HomePage;
paramsPage : any = ParamsPage;
profilPage = ProfilePage;

constructor() {
    if( localStorage.getItem('email')!=null){
        this.paramsPage=LoginPage;
      }
  }



}