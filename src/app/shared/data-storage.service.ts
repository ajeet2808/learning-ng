import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) {

  }
  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put(`https://ng-recipe-book-bb93a.firebaseio.com/recipes.json?auth=${token}`, this.recipeService.getRecipes());
  }
  getRecipes() {
    const token = this.authService.getToken();

    this.http.get(`https://ng-recipe-book-bb93a.firebaseio.com/recipes.json?auth=${token}`).pipe(map((response: Response) => {
      return response.json();
    })).subscribe((recipies: any[]) => {
      this.recipeService.setRecipies(recipies);
    });
  }
}
