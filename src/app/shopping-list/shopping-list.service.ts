import { Subject } from "rxjs";
import { Ingridient } from "../shared/ingridient.model";

export class ShoppingListService {

  ingridientsChanged = new Subject<Ingridient[]>();

  private ingridients: Ingridient[] = [
    new Ingridient('Meat',1),
    new Ingridient('Pasta',2),
    new Ingridient('Chese',1),
    new Ingridient('Ham', 1),
    new Ingridient('Spagette',2)
  ];

  getIngridients() {
    return this.ingridients.slice();
  }

  addIngridient(ingridient: Ingridient){
    this.ingridients.push(ingridient);
    this.ingridientsChanged.next(this.ingridients.slice());
  }

  addIngredients(ingredients: Ingridient[]) {
    this.ingridients.push(...ingredients);
    this.ingridientsChanged.next(this.ingridients.slice());
  }
}
