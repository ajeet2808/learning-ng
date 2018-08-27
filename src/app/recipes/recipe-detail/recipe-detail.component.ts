import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as shoppingList from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipeReducer from '../store/recipe.reducer';
import * as fromRecipeActions from '../store/recipe.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipeReducer.FeaturState>) { }
  recipe: Recipe;
  id: number;
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.store.select('recipes').pipe(take(1))
        .subscribe((recipeState: fromRecipeReducer.State) => {
          this.recipe = recipeState.recipes[this.id];
        });
    });
  }

  sendToShoppingList() {
    this.store.dispatch(new shoppingList.AddIngredients(this.recipe.ingredients));
  }
  onDelete() {
    this.store.dispatch(new fromRecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
