import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  url = "https://ng-recipe-book-bb93a.firebaseio.com/recipes.json";
  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {

  }
  storeRecipes() {
    const token = this.authService.getToken();
    // return this.httpClient.put(this.url,
    //   this.recipeService.getRecipes());
    const req = new HttpRequest(
      'PUT',
      this.url,
      this.recipeService.getRecipes(),
      {
        reportProgress: true
      });
    return this.httpClient.request(req);
  }
  getRecipes() {
    const token = this.authService.getToken();

    this.httpClient.get<Recipe[]>(this.url)
      .pipe(map(recipe => {
        recipe.forEach((recipe => {
          if (!recipe['ingredients']) {
            recipe.ingredients = []
          }
        }))
        return recipe;
      })).subscribe((recipies) => {
        this.recipeService.setRecipies(recipies);
      });
  }
}
