import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();

  private debounceSuscription?: Subscription;

  @Input() public placeholder: string = '';

  @Input() public initialValue: string = '';

  @Output() public onEmitter: EventEmitter<string> = new EventEmitter()

  @Output() public onDebounce: EventEmitter<string> = new EventEmitter()

  ngOnInit(): void {
    this.debounceSuscription = this.debouncer
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value => {
        this.onDebounce.emit(value)
      }
      )
  }

  ngOnDestroy(): void {
    this.debounceSuscription?.unsubscribe();
  }


  public emitValue(value: string): void {
    this.onEmitter.emit(value)
  }

  public onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm)
  }

}
