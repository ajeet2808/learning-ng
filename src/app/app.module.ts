import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { GameControlComponent } from './assignment/game-control/game-control.component';
import { OddComponent } from './assignment/odd/odd.component';
import { EvenComponent } from './assignment/even/even.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { HomeComponent } from './core/home/home.component';
import { AssignmentModule } from './assignment/assignment.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    AuthModule,
    ShoppingListModule,
    AppRoutingModule,
    AssignmentModule,
    CoreModule
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
