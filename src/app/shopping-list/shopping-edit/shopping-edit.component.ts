import { Subscription } from 'rxjs';
import { Ingridient } from './../../shared/ingridient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';

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

  constructor(private slService: ShoppingListService) { }

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
    if(this.edditMode){
      this.slService.updateIngredient(this.edditetItemIndex, newIngredient)
    }
    else {
      this.slService.addIngridient(newIngredient);
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
    this.slService.deleteIngredient(this.edditetItemIndex);
    this.onClearItem;
  }

}
