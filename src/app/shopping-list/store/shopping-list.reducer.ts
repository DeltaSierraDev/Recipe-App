import { Ingridient } from "src/app/shared/ingridient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingridient[];
  edditedIngredient: Ingridient;
  edditedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingridient('Meat',1),
    new Ingridient('Pasta',2),
    new Ingridient('Chese',1),
    new Ingridient('Ham', 1),
    new Ingridient('Spagette',2)
  ],
  edditedIngredient: null,
  edditedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: any) {
  switch ( (action.type)) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
      case ShoppingListActions.UPDATE_INGREDIENT:
        const ingredient = state.ingredients[state.edditedIngredientIndex];
        const updatedIngredient = {
          ...ingredient,
          ...action.payload
        }
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[state.edditedIngredientIndex] = updatedIngredient;
        return {
        ...state,
        ingredients: updatedIngredients,
        edditedIngredient: null,
        edditedIngredientIndex: -1
      };
      case ShoppingListActions.DELETE_INGREDIENT:
        return {
          ...state,
          ingredient: state.ingredients.filter((ig, igindex) => {
            console.log(igindex + '=' +state.edditedIngredientIndex + " " + (igindex !== state.edditedIngredientIndex));
            return igindex !== state.edditedIngredientIndex;
          }),
          edditedIngredient: null,
          edditedIngredientIndex: -1
        };
      case ShoppingListActions.START_EDIT:
        return {
          ...state,
          edditedIngredientIndex: action.payload,
          edditedIngredient: {...state.ingredients[action.payload]}
        };
      case ShoppingListActions.STOP_EDIT:
        return {
          ...state,
          edditedIngredient: null,
          edditedIngredientIndex: -1
        };
    default:
      return state;
  }
}

