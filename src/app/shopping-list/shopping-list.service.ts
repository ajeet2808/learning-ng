import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientListChanged = new EventEmitter<Ingredient[]>();
  startedEditing = new Subject<number>();
  constructor() { }
  private ingredients: Ingredient[] = [
    new Ingredient('Appple', 10),
    new Ingredient('Yogurt', 1)
  ];
  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientListChanged.emit(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientListChanged.emit(this.ingredients.slice());
  }
  getIngredient(id: number) {
    return this.ingredients[id];
  }
  updateIngredient(id: number, ingredient: Ingredient) {
    this.ingredients[id] = ingredient;
    this.ingredientListChanged.emit(this.ingredients.slice());
  }
  deleteIngrident(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientListChanged.emit(this.ingredients.slice());
  }
}
