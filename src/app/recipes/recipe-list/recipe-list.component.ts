import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  id: number;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEditRecipe(){
    this.id = this.route.firstChild.snapshot.params['id'];
    this.router.navigate([this.id,'edit'], { relativeTo: this.route });
  }
}
