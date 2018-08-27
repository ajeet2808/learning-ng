import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import * as fromRecipeReducer from '../store/recipe.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipeReducer.State>;
  subscription: Subscription;
  constructor(
    private store: Store<fromRecipeReducer.FeaturState>) { }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }
}
