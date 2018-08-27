import { Effect, Actions } from "@ngrx/effects";
import * as fromRecipeActions from '../store/recipe.actions';
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as fromRecipeReducer from '../store/recipe.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffect {
    url = "https://ng-recipe-book-bb93a.firebaseio.com/recipes.json";
    @Effect()
    recipeFetch = this.actions$.ofType(fromRecipeActions.FETCH_RECIPES)
        .pipe(
            switchMap((action: fromRecipeActions.FetchRecipes) => {
                //return [];
                return this.httpClient.get<Recipe[]>(this.url, { observe: "body", responseType: "json" });
            }),
            map((recipes: Recipe[]) => {
                recipes.forEach((recipe => {
                    if (!recipe['ingredients']) {
                        recipe.ingredients = []
                    }
                }));
                console.log('fetched recipes', recipes);
                return {
                    type: fromRecipeActions.SET_RECIPES,
                    payload: recipes
                }
            })
        );
    @Effect({ dispatch: false })
    recipeSave = this.actions$.ofType(fromRecipeActions.SAVE_RECIPES)
        .pipe(
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, State]) => {
                const req = new HttpRequest(
                    'PUT',
                    this.url,
                    State.recipes,
                    {
                        reportProgress: true
                    });
                return this.httpClient.request(req);
            })
        );

    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipeReducer.FeaturState>) { }
}