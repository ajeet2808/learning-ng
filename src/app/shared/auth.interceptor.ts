import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";
import { switchMap, take } from "rxjs/operators";
import * as fromAuth from '../auth/store/auth.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return this.store.select('auth').pipe(take(1)).pipe(switchMap(
            (authState: fromAuth.State, index: number): Observable<any> => {
                const copiedReq = req.clone({
                    params: req.params.append('auth', authState.token)
                });
                return next.handle(copiedReq);
            })
        )
    }
}