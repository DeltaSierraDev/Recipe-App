import { Recipe } from './../recipe.model';
import { Action } from "@ngrx/store";

export const SET_RECIPES = '[Recipe] Set Recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]){}
}

export type RecipeActions = SetRecipes;
