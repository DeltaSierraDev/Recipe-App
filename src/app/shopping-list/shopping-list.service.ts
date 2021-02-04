import { EventEmitter } from "@angular/core";
import { Ingridient } from "../shared/ingridient.model";

export class ShoppingListService {

  ingridientsChanged = new EventEmitter<Ingridient[]>();

  private ingridients: Ingridient[] = [
    new Ingridient('Meat',1),
    new Ingridient('Pasta',2),
    new Ingridient('Chese',1)
  ];

  getIngridients() {
    return this.ingridients.slice();
  }

  addIngridient(ingridient: Ingridient){
    this.ingridients.push(ingridient);
    this.ingridientsChanged.emit(this.ingridients.slice());
  }
}
