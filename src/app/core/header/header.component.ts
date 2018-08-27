import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as fromAuth from '../../auth/store/auth.reducer';
import * as fromAuthActions from '../../auth/store/auth.actions';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromRecipeActions from '../../recipes/store/recipe.actions';
import * as fromRecipeReducer from '../../recipes/store/recipe.reducer';

@Component({
    'selector': 'app-header',
    'templateUrl': 'header.component.html'
})
export class HeaderComponent implements OnInit {
    constructor(private router: Router,
        private store: Store<fromRecipeReducer.FeaturState>) {

    }
    public authState: Observable<fromAuth.State>;
    onSave() {
        this.store.dispatch(new fromRecipeActions.SaveRecipes());
    }
    onFetch() {
        this.store.dispatch(new fromRecipeActions.FetchRecipes());
        this.router.navigate(["/recipes"]);
    }
    onLogout() {
        this.store.dispatch(new fromAuthActions.Logout());
    }
    ngOnInit() {
        this.authState = this.store.select('auth');
    }
}