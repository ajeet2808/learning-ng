import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { EvenComponent } from './even/even.component';
import { OddComponent } from './odd/odd.component';
import { GameControlComponent } from './game-control/game-control.component';
import { AssignmentComponent } from './assignment.component';
import { AssignmentRoutingModule } from './assignment-routing.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    AssignmentRoutingModule
  ],
  declarations: [
    EvenComponent,
    OddComponent,
    GameControlComponent,
    AssignmentComponent
  ],
  exports: [
    AssignmentComponent
  ]
})
export class AssignmentModule { }
