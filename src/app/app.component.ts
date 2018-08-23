import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCMiT7udq69y_8eB7edI_A5XJy6YDMWWAw",
      authDomain: "ng-recipe-book-bb93a.firebaseapp.com",
    })
  }
}
