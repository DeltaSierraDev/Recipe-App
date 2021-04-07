import { Subscription } from 'rxjs';
import { DataStorageService } from './../shared/dataStorage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>){}

  private userSub: Subscription;
  isAuthenticated = false;
  collapsed = true;

  ngOnInit(){
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    }
    );
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  onSaveData(){
    this.dataStorageService.saveRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes()
    .subscribe(
    );
  }

  onLogout(){
    this.authService.signout();
  }

}
