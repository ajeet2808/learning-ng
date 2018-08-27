import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from '../../shared/ingredient.model';
import { Subscription } from 'rxjs';
import * as fromRecipeActions from '../store/recipe.actions';
import * as fromRecipeReducer from '../store/recipe.reducer';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  subsciprtion: Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipeReducer.FeaturState>) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }
  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let ingredients = new FormArray([]);
    if (this.editMode) {
      this.store.select('recipes').pipe(take(1))
        .subscribe((recipeState: fromRecipeReducer.State) => {
          let recipe = recipeState.recipes[this.id];
          recipeName = recipe.name;
          imagePath = recipe.imagePath;
          description = recipe.description;
          recipe.ingredients.forEach((x: Ingredient) => {
            ingredients.push(new FormGroup({
              "name": new FormControl(x.name, [Validators.required]),
              "amount": new FormControl(x.amount, [Validators.required, Validators.pattern("[1-9]+[0-9]*")])
            }));
          })
        });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imagePath': new FormControl(imagePath),
      'description': new FormControl(description, [Validators.required]),
      'ingredients': ingredients
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new fromRecipeActions.UpdateRecipe({ index: this.id, updatedRecipe: this.recipeForm.value }));
    } else {
      this.store.dispatch(new fromRecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      "name": new FormControl(null, [Validators.required]),
      "amount": new FormControl(null, [Validators.required, Validators.pattern("[1-9]+[0-9]*")])
    }));
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  getControls(): AbstractControl[] {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
