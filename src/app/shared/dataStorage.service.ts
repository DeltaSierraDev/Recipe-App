import * as RecipeActions from './../recipes/store/reicpe.actions';
import { Store } from '@ngrx/store';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer'

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private store: Store<fromApp.AppState>){}

  private recipeURL = 'https://recipe-app-a85a1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.recipeURL, recipes)
    .subscribe();
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>(this.recipeURL)
    .pipe(
      map(
        recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          });
        }
      ),
      tap(recipes => {
        this.store.dispatch(new RecipeActions.SetRecipes(recipes));
        // this.recipeService.setRecipes(recipes);
      })
    );
  }

}
