import { Ingridient } from './../../shared/ingridient.model';
import { Action } from "@ngrx/store";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';


export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor (public payload: Ingridient){}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor (public payload: Ingridient[]){}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor (public payload: {index: number, ingredient: Ingridient}){
    console.log('Action ' + payload.index + '' + payload.ingredient);

  }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
  constructor (public payload: number){
    console.log('Action ' + payload);

  }
}

export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient;
