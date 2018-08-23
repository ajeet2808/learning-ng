import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { Input } from '@angular/compiler/src/core';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private slService: ShoppingListService) { }
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('shoppingForm') shoppingForm: NgForm;
  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe((id: number) => {
      this.editMode = true;
      this.editedItemIndex = id;
      this.editedItem = this.slService.getIngredient(this.editedItemIndex)
      this.shoppingForm.setValue({
        'name': this.editedItem.name,
        'amount': this.editedItem.amount
      })
    });
  }

  onSubmit() {
    const ingredient = new Ingredient(this.shoppingForm.value.name, this.shoppingForm.value.amount)
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, ingredient);
      this.editMode = false;
    } else {
      this.slService.addIngredient(ingredient);
    }
    this.shoppingForm.reset();
  }
  onClear() {
    this.editMode = false;
    this.shoppingForm.reset();
  }
  onDelete() {
    this.editMode = false;
    this.slService.deleteIngrident(this.editedItemIndex);
    this.shoppingForm.reset();
  }
}
