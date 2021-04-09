import { AuthService } from './auth/auth.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId){}

  title = 'shop-project';
  loadedLink = 'recipes';

  ngOnInit(){
    if (isPlatformBrowser(this.platformId)) {
      this.authService.autologin();
      console.log("BROWSER");
    }
    console.log("SERVER");

  }
}
