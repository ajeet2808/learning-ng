import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as fromRecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

export interface FeaturState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: [
        new Recipe(
            "Paneer Tikka (d)",
            "Paneer Tikka is a very delicious food item. This is used with chapati.",
            "http://foodpics.in/images/home-image-25-jul-2012.jpg",
            [new Ingredient("Paneer", 100), new Ingredient("Spices", 50)]
        ),
        new Recipe(
            "Veg Burger with Fries (d)",
            "Veg Burger with Fires is awesome food. But it is a junk food. You should avoid having it when you are losing weight.",
            "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?cs=srgb&dl=chips-dinner-fast-food-70497.jpg&fm=jpg",
            [new Ingredient("Bread", 2), new Ingredient("Spices", 100), new Ingredient("Potato", 100)]
        )
    ]
};

export function recipeReducer(state = initialState, action: fromRecipeActions.RecipeActions) {
    switch (action.type) {
        case fromRecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            };
        case fromRecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case fromRecipeActions.UPDATE_RECIPES:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = { ...recipe, ...action.payload.updatedRecipe };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            }
        case fromRecipeActions.DELETE_RECIPES:
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            }
    }
    return state;
}