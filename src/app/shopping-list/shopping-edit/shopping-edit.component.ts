import { Subscription } from 'rxjs';
import { Ingridient } from './../../shared/ingridient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from "../store/shopping-list.actions";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientForm', {static: false}) slForm: NgForm;
  subscription: Subscription;
  edditMode = false;
  edditetItemIndex: number;
  edditedIngredinet: Ingridient;

  constructor(private slService: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingridient[]}}>) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEdditing.subscribe(
      (index: number) => {
        this.edditetItemIndex = index;
        this.edditMode = true;
        this.edditedIngredinet = this.slService.getIngredinet(index);
        this.slForm.setValue(
          {
            name: this.edditedIngredinet.name,
            amount: this.edditedIngredinet.amount
          });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingridient(value.name, value.amount);
    const id = this.edditetItemIndex;
    if(this.edditMode){
      console.log(id);
      console.log(newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: id, ingredient: newIngredient}));
    }
    else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.edditMode = false;
    form.reset();
  }

  onClearItem(){
    this.edditMode = false;
    this.slForm.reset();
  }

  onRemoveItem(){
    this.edditMode = false;
    console.log(this.edditetItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.edditetItemIndex));
    this.onClearItem;
  }

}
