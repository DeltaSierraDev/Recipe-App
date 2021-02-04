import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Lasagne', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatibus accusamus eveniet! Provident dolorem porro exercitationem explicabo earum rem iusto placeat magni harum, voluptatibus delectus ipsum quia quae fugit eligendi.', 'https://144f2a3a2f948f23fc61-ca525f0a2beaec3e91ca498facd51f15.ssl.cf3.rackcdn.com/uploads/food_portal_data/recipes/recipe/hero_article_image/4417/compressed_Meatlessfarm_Lasagne.jpg'),
    new Recipe('Bolognese', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatibus accusamus eveniet! Provident dolorem porro exercitationem explicabo earum rem iusto placeat magni harum, voluptatibus delectus ipsum quia quae fugit eligendi.', 'https://supervalu.ie/thumbnail/720x400/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg?fill=1'),
    new Recipe('Milanesse', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatibus accusamus eveniet! Provident dolorem porro exercitationem explicabo earum rem iusto placeat magni harum, voluptatibus delectus ipsum quia quae fugit eligendi.', 'https://media-cdn.tripadvisor.com/media/photo-s/08/64/65/8b/la-luna.jpg')
  ];

  getRecipes(){
    return this.recipes.slice();
  }

}
