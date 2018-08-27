import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  constructor() { }

  private recipes: Recipe[] = [new Recipe('Paneer Tikka',
    'Paneer Tikka is a very delicious food item. This is used with chapati.',
    "http://foodpics.in/images/home-image-25-jul-2012.jpg",
    [new Ingredient("Paneer", 100), new Ingredient('Spices', 50)]),
  new Recipe('Veg Burger with Fries',
    'Veg Burger with Fires is awesome food. But it is a junk food. You should avoid having it when you are losing weight.',
    "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?cs=srgb&dl=chips-dinner-fast-food-70497.jpg&fm=jpg ",
    [new Ingredient("Bread", 100), new Ingredient('Spices', 100), new Ingredient('Potato', 100)])];
  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
  getRecipe(id: number): Recipe {
    return Object.assign({}, this.recipes[id]);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes);
  }

  setRecipies(recipes: Recipe[]) {
    this.recipes = [];
    this.recipes.push(...recipes);
    this.recipesChanged.next(this.recipes.slice());
  }
}
