import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as shoppingList from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Output("onRecipe") recipeLoaded = new EventEmitter<Recipe>();
  constructor(private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sotre: Store<fromApp.AppState>) { }
  recipe: Recipe;
  id: number;
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
      this.recipeLoaded.emit(this.recipe);
    });
  }

  sendToShoppingList() {
    this.sotre.dispatch(new shoppingList.AddIngredients(this.recipe.ingredients));
  }
  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
