import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Injectable } from "@angular/core";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const copiedReq = req.clone({
            params: req.params.append('auth', this.authService.getToken())
        });
        console.log('Intercepted!', copiedReq);
        return next.handle(copiedReq);
    }
}