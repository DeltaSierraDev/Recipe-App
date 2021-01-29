export class Recipe {
  public name: string;
  public desc: string;
  public imagePath: string;
  public owner: string;
  public date: Date;


  constructor(name: string, desc: string, imagePath: string){
    this.name = name;
    this.desc = desc;
    this. imagePath = imagePath;
    this.date = new Date();
    this.owner = 'Crazie Developer';
  }
}
