import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/dataStorage.service';
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


  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      });
    this.recipes = this.recipeService.getRecipes();
    this.dataStorageService.fetchRecipes()
    .subscribe();
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  onNewRecipe(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  // tslint:disable-next-line: typedef
  onEditRecipe(){
    this.id = this.route.firstChild.snapshot.params.id;
    this.router.navigate([this.id, 'edit'], { relativeTo: this.route });
  }
  // tslint:disable-next-line: typedef
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
  // tslint:disable-next-line: typedef
  onSelectedEnable(){
    if (this.route.firstChild.snapshot.params.id !== undefined) {
      return false;
    } else {
      return true;
    }
  }

  onSelectRecipe(index){
    this.id = index;
  }
}
