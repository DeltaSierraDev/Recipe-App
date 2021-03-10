import { Ingridient } from "../shared/ingridient.model";

export class Recipe {
  public name: string;
  public desc: string;
  public imagePath: string;
  public owner: string;
  public date: Date;
  public ingredients: Ingridient[];


  constructor(name: string, desc: string, imagePath: string, ingredients: Ingridient[]){
    this.name = name;
    this.desc = desc;
    this.imagePath = imagePath;
    this.date = new Date();
    this.owner = 'Crazie Developer';
    this.ingredients = ingredients;
  }
}
