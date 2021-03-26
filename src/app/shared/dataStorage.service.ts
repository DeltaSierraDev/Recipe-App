import { Recipe } from './../recipes/recipe.model';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService){}

  private recipeURL = 'https://recipe-app-a85a1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.recipeURL, recipes)
    .subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipes(){
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<Recipe[]>(this.recipeURL, {
        params: new HttpParams().set('auth', user.token)
      });
    }),
      map(
        recipes => {
          return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          });
        }
      ),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }

}
