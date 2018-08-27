import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataStorageService } from "../../shared/data-storage.service";
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as fromAuthActions from '../../auth/store/auth.actions';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

@Component({
    'selector': 'app-header',
    'templateUrl': 'header.component.html'
})
export class HeaderComponent implements OnInit {
    constructor(private dataStorageService: DataStorageService,
        private router: Router,
        private store: Store<fromApp.AppState>) {

    }
    public authState: Observable<fromAuth.State>;
    onSave() {
        this.dataStorageService.storeRecipes().subscribe((response): void => {
            console.log(response);
        })
    }
    onFetch() {
        this.dataStorageService.getRecipes();
        this.router.navigate(["/recipes"]);
    }
    onLogout() {
        this.store.dispatch(new fromAuthActions.Logout());
    }
    ngOnInit() {
        this.authState = this.store.select('auth');
    }
}