import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import * as fromAuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }
  onSignin(form: NgForm) {
    this.store.dispatch(new fromAuthActions.TrySignin(form.value));
  }
}
