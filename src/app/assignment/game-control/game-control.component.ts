import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output('numberGenerated') numberGenerator = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }
  count = 1;
  intervalRef;
  started = false;
  onStart() {
    if (!this.started) {
      this.started = true;
      this.intervalRef = setInterval((): void => {
        this.numberGenerator.emit(this.count);
        this.count++;
      }, 1000);
    }
  }
  onStop() {
    clearInterval(this.intervalRef);
    this.started = false;
    this.count = 0;
  }
}
