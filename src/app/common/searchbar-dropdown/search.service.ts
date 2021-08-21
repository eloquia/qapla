import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SearchResult } from './models';

@Injectable()
export class SearchService {
  private searchResultsSubject_: Subject<SearchResult[]> = new BehaviorSubject<
    SearchResult[]
  >([]);
  public searchResults$: Observable<SearchResult[]> =
    this.searchResultsSubject_.asObservable();

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<SearchResult[]>('http://localhost:8080/input').pipe(
      tap((searchResults) => {
        this.searchResultsSubject_.next(searchResults);
      })
    );
  }

  public search(term: string): void {
    console.log('search term', term);
  }
}
