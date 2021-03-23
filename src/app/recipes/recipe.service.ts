import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingridient } from "../shared/ingridient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Lasagne',
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatibus accusamus eveniet! Provident dolorem porro exercitationem explicabo earum rem iusto placeat magni harum, voluptatibus delectus ipsum quia quae fugit eligendi.',
      'https://144f2a3a2f948f23fc61-ca525f0a2beaec3e91ca498facd51f15.ssl.cf3.rackcdn.com/uploads/food_portal_data/recipes/recipe/hero_article_image/4417/compressed_Meatlessfarm_Lasagne.jpg',
      [
        new Ingridient('Meat', 1),
        new Ingridient('Pasta', 2)
      ]
    ),
    new Recipe(
      'Bolognese',
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatibus accusamus eveniet! Provident dolorem porro exercitationem explicabo earum rem iusto placeat magni harum, voluptatibus delectus ipsum quia quae fugit eligendi.',
      'https://supervalu.ie/thumbnail/720x400/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg?fill=1',
      [
        new Ingridient('Meat', 1),
        new Ingridient('Spagette', 2)
      ]
      ),
    new Recipe(
      'Milanesse',
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatibus accusamus eveniet! Provident dolorem porro exercitationem explicabo earum rem iusto placeat magni harum, voluptatibus delectus ipsum quia quae fugit eligendi.',
      'https://media-cdn.tripadvisor.com/media/photo-s/08/64/65/8b/la-luna.jpg',
      [
        new Ingridient('Ham', 1),
        new Ingridient('Spagette', 2)
      ]
      )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingridient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    recipe.owner = 'crazieDeveloper';
    recipe.date = new Date();
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());

  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipes[index].owner = 'crazieDeveloper'
    this.recipes[index].date = new Date();
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
