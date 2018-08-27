import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromAuthActions from './auth.actions';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.ofType(fromAuthActions.TRY_SIGNUP)
        .pipe(
            map((action: fromAuthActions.TrySignup) => {
                return action.payload;
            }),
            switchMap((authData: { email: string, password: string }) => {
                return from(
                    firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
                );
            }),
            switchMap(() => {
                return from(
                    firebase.auth().currentUser.getIdToken()
                );
            }),
            mergeMap((token: string) => {
                this.router.navigate(["/"]);
                return [
                    {
                        type: fromAuthActions.SIGNUP
                    },
                    {
                        type: fromAuthActions.SET_TOKEN,
                        payload: token
                    }
                ];
            })
        );
    @Effect()
    authSignin = this.actions$.ofType(fromAuthActions.TRY_SIGNIN)
        .pipe(
            map((action: fromAuthActions.TrySignin) => {
                return action.payload;
            }),
            switchMap((authData: { email: string, password: string }) => {
                return firebase.auth().signInWithEmailAndPassword(authData.email, authData.password);
            }),
            switchMap(() => {
                return firebase.auth().currentUser.getIdToken();
            }),
            mergeMap((token: string) => {
                this.router.navigate(["/"]);
                return [
                    {
                        type: fromAuthActions.SIGNIN
                    },
                    {
                        type: fromAuthActions.SET_TOKEN,
                        payload: token
                    }
                ]
            })
        );
    @Effect({ dispatch: false })
    authLogout = this.actions$.ofType(fromAuthActions.LOGOUT)
        .pipe(tap(() => {
            this.router.navigate(["/"]);
        }));
    constructor(private actions$: Actions, private router: Router) {

    }
}