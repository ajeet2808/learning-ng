import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AuthModule } from "./auth/auth.module";
import { AuthGuardService } from "./auth/auth-guard.service";

const appRoutes: Routes = [
    { path: "", redirectTo: '/home', pathMatch: 'full' },
    { path: "recipes", loadChildren: "./recipes/recipes.module#RecipesModule", canLoad: [AuthGuardService] },
    { path: "shopping-list", component: ShoppingListComponent }
]
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
        AuthModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}