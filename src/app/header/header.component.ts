import { DataStorageService } from './../shared/dataStorage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  collapsed = true;

  constructor(private dataStorageService: DataStorageService){}

  onSaveData(){
    this.dataStorageService.saveRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes()
    .subscribe(

    );
  }
}
