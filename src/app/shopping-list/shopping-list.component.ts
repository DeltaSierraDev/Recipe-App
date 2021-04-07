import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingridient } from '../shared/ingridient.model';
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingridient[]}>;
  private ingridientChangeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy(): void {
    this.ingridientChangeSub.unsubscribe();
  }

  onEditItem(index: number){
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
