import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { NoRecipeSelectedComponent } from './no-recipe-selected/no-recipe-selected.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { AuthModule } from '../auth/auth.module';

const recipeRoutes: Routes = [
  {
    path: "", component: RecipesComponent, children: [
      { path: '', component: NoRecipeSelectedComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService] },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(recipeRoutes),
    AuthModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class RecipeRoutingModule { }
