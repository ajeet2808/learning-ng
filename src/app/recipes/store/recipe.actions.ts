import { Recipe } from "../recipe.model";
import { Action } from "@ngrx/store";

export const FETCH_RECIPES = "FETCH_RECIPES";
export const SAVE_RECIPES = "SAVE_RECIPES";
export const SET_RECIPES = "SET_RECIPES";
export const ADD_RECIPE = "ADD_RECIPES";
export const UPDATE_RECIPES = "UPDATE_RECIPES";
export const DELETE_RECIPES = "DELETE_RECIPES";

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export class SaveRecipes implements Action {
    readonly type = SAVE_RECIPES;
}

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]) { }
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe) { }
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPES;
    constructor(public payload: { index: number, updatedRecipe: Recipe }) { }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPES;
    constructor(public payload: number) { }
}

export type RecipeActions = SetRecipes |
    AddRecipe |
    UpdateRecipe |
    DeleteRecipe |
    FetchRecipes |
    SaveRecipes;
