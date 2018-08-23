import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Output("onRecipe") recipeLoaded = new EventEmitter<Recipe>();
  constructor(private recipeService: RecipeService,
    private slService: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }
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
    this.recipe.ingredients.forEach((item: Ingredient) => {
      this.slService.addIngredient(item);
    })
  }
  onDelete() {
    if (this.authService.isAuthenticated()) {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }
}
