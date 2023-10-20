import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Subject, debounceTime, delay } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  private debouncer: Subject<string> = new Subject<string>();

  @Input() public placeholder: string = '';

  @Output() public onEmitter: EventEmitter<string> = new EventEmitter()

  @Output() public onDebounce: EventEmitter<string> = new EventEmitter()

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value => {
        this.onDebounce.emit(value)
      }
      )
  }

  public emitValue(value: string): void {
    this.onEmitter.emit(value)
  }

  public onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm)
  }

}
