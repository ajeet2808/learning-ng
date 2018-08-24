import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    CoreRoutingModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  exports: [
    HomeComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
