import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.ingredientListChanged.subscribe((updatedList: Ingredient[]) => {
      this.ingredients = updatedList;
    });
    this.ingredients = this.shoppingListService.getIngredients();
  }
  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }
}
