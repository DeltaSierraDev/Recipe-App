import { Ingridient } from './../shared/ingridient.model';
import { Subject } from "rxjs";

export class ShoppingListService {

  ingridientsChanged = new Subject<Ingridient[]>();
  startedEdditing = new Subject<number>();

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

  getIngredinet(index: number){
    return this.ingridients[index];
  }

  updateIngredient(index: number, newIngredient: Ingridient){
    this.ingridients[index] = newIngredient;
    this.ingridientsChanged.next(this.ingridients.slice());
  }

  deleteIngredient(index: number) {
    this.ingridients.splice(index, 1);
    this.ingridientsChanged.next(this.ingridients.slice());
  }
}
