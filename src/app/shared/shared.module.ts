import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataStorageService } from './data-storage.service';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DropdownDirective],
  providers: [
    DataStorageService
  ],
  exports: [
    CommonModule,
    DropdownDirective
  ]
})
export class SharedModule { }
