import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map, take } from 'rxjs/operators';
import * as fromAuth from './store/auth.reducer';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private store: Store<fromApp.AppState>) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.store.select('auth').pipe(take(1), map((authState: fromAuth.State) => {
      console.log('canActivate:', authState.authenticated);
      return authState.authenticated;
    }));
  }

  canLoad(route: Route): boolean | Observable<boolean> {
    return this.store.select('auth').pipe(take(1), map((authState: fromAuth.State) => {
      console.log('canLoad:', authState.authenticated);
      return authState.authenticated;
    }));
  }
}