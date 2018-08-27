import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shoppingList from '../store/shopping-list.actions';
import { EndEditIngredient } from '../store/shopping-list.actions';
import { NgForm } from '@angular/forms';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>) { }
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('shoppingForm') shoppingForm: NgForm;
  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe((data) => {
      if (data.editedIngredientIndex > -1) {
        this.editedItem = data.editedIngredient;
        this.editedItemIndex = data.editedIngredientIndex;
        this.editMode = true;
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editedItem = null;
        this.editedItemIndex = -1;
        this.editMode = false;
      }
    });
  }

  onSubmit() {
    const ingredient = new Ingredient(this.shoppingForm.value.name, this.shoppingForm.value.amount)
    if (this.editMode) {
      this.store.dispatch(new shoppingList.UpdateIngredient({ index: this.editedItemIndex, ingredient: ingredient }));
      this.editMode = false;
    } else {
      this.store.dispatch(new shoppingList.AddIngredient(ingredient));
    }
    this.shoppingForm.reset();
  }
  onClear() {
    this.editMode = false;
    this.shoppingForm.reset();
  }
  onDelete() {
    this.editMode = false;
    this.store.dispatch(new shoppingList.DeleteIngredient(this.editedItemIndex));
    this.shoppingForm.reset();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new EndEditIngredient());
  }
}
