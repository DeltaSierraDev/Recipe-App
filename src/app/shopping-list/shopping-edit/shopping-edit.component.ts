import { Subscription } from 'rxjs';
import { Ingridient } from './../../shared/ingridient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from "../store/shopping-list.actions";
import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientForm', {static: false}) slForm: NgForm;
  subscription: Subscription;
  edditMode = false;
  edditedIngredinet: Ingridient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.edditedIngredientIndex > -1) {
        this.edditMode = true;
        this.edditedIngredinet = stateData.edditedIngredient;
        this.slForm.setValue({
            name: this.edditedIngredinet.name,
            amount: this.edditedIngredinet.amount
          });
      } else {
        this.edditMode = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingridient(value.name, value.amount);
    if(this.edditMode){
      this.store.dispatch(new ShoppingListAction.UpdateIngredient(newIngredient));
    }
    else {
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient));
    }
    this.edditMode = false;
    form.reset();
  }

  onClearItem(){
    this.edditMode = false;
    this.slForm.reset();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  onRemoveItem(){
    this.edditMode = false;
    this.store.dispatch(new ShoppingListAction.DeleteIngredient());
    this.onClearItem;
  }

}
