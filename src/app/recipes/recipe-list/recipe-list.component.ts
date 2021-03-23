import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  recipes: Recipe[];
  id: number;


  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      })

    this.recipes = this.recipeService.getRecipes();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewRecipe(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEditRecipe(){
    this.id = this.route.firstChild.snapshot.params['id'];
    this.router.navigate([this.id,'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }

  onSelectedEnable(){
    if (this.route.firstChild.snapshot.params['id'] !== undefined) {
      return false;
    } else {
      return true;
    }
  }
}
