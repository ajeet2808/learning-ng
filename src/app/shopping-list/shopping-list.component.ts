import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StartEditIngredient } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ ingredients: Ingredient[] }>;
  constructor(private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }
  onEditItem(id: number) {
    this.store.dispatch(new StartEditIngredient(id));
  }
}