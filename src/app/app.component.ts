import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, filter, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'next-word-frontend';
  predictions: number = 5;
  tokens: number = 1;
  temperature: number = 1.0;
  model: string[] = ['bert-base'];
  selectedModel: string = this.model[0];

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  private searchTerms = new Subject<string>();

  constructor(public appService: AppService){}

  ngOnInit() {

    this.filteredOptions = this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(term => term.trim().length > 0),
      switchMap((term: string) =>
        this.appService.generate(term, this.predictions, this.tokens)
          .pipe(
            map(data => data.words)
          )
      )
    );

    this.filteredOptions.subscribe(options => {
      this.options = options;
    });

    this.myControl.valueChanges.subscribe(term => {
      this.searchTerms.next(term);
    });
  }

}
