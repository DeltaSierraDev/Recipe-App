import { NgModule } from "@angular/core";
import { AuthInterceptorService } from './auth/authInterceptor.service';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  providers: [
    RecipeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ]
})
export class CoreModule {}
