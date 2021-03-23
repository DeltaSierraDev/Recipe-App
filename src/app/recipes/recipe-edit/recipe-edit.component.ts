import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private reciperService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +this.route.snapshot.params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

  private initForm(){
    let recipeName = '';
    let recipeImageURL = '';
    let recipeDesc = '';
    if (this.editMode) {
      const recipe = this.reciperService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDesc = recipe.desc;
      recipeImageURL = recipe.imagePath;
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'desc': new FormControl(recipeDesc),
      'imageURL': new FormControl(recipeImageURL)
    });
  }
}
