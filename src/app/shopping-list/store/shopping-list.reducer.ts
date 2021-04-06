import { Ingridient } from "../../shared/ingridient.model";
import * as ShoppingListActions from "./shopping-list.actions";


const initialState = {
  ingredients: [
    new Ingridient('Meat',1),
    new Ingridient('Pasta',2),
    new Ingridient('Chese',1),
    new Ingridient('Ham', 1),
    new Ingridient('Spagette',2)
  ]
};

export function shoppingListReducer(state = initialState, action: any) {
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
        console.log('Reducer ' + action.payload.index + ' ' + action.payload.ingridient);

        const ingredient = state.ingredients[action.payload.index];
        const updatedIngredient = {
          ...ingredient,
          ...action.payload.ingridient
        }
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[action.payload.index] = updatedIngredient;
        console.log('Updating ' + action.payload.ingridient);

        return {
        ...state,
        ingredients: updatedIngredients
      };
      case ShoppingListActions.DELETE_INGREDIENT:
      console.log(state.ingredients.filter((ig, igindex) => {
        return igindex !== action.payload;
      }));
      return {
        ...state,
        ingredient: state.ingredients.filter((ig, igindex) => {
          return igindex !== action.payload;
        })
      };
    default:
      return state;
  }
}

