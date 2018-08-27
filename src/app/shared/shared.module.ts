import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DropdownDirective],
  providers: [],
  exports: [
    CommonModule,
    DropdownDirective
  ]
})
export class SharedModule { }
