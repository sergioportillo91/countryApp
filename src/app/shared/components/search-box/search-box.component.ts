import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @Input() public placeholder: string = '';


  @Output() public onEmitter: EventEmitter<string> = new EventEmitter()


  public emitValue(value: string): void {

    this.onEmitter.emit(value)

  }

}
