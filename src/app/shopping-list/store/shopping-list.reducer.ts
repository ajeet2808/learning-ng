
import * as ShoppingListAction from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}
const initialState = {
    ingredients: [
        new Ingredient('Appple', 10),
        new Ingredient('Yogurt', 1)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
}
export function shoppingListReducer(state = initialState, action: ShoppingListAction.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListAction.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case ShoppingListAction.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShoppingListAction.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = { ...ingredient, ...action.payload.ingredient };
            const ingredients = [...state.ingredients];
            ingredients[action.payload.index] = updatedIngredient;
            return {
                ...state,
                ingredients: ingredients
            }
        case ShoppingListAction.DELETE_INGREDIENT:
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(action.payload, 1)
            return {
                ...state,
                ingredients: oldIngredients
            }
        case ShoppingListAction.END_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListAction.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            }
        default:
            return state;
    }
}