import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from './models';
import { SearchService } from './search.service';

/**
 * Dropdown with Search
 *
 * Reusable component
 *
 * Events:
 * * When <input> has focus, do a search with provided values (empty string)
 * * When <input> loses focus (clicking out of input), remove search results
 * * When clicking on a search result, remove search results
 */
@Component({
  selector: 'app-searchbar-dropdown',
  templateUrl: './searchbar-dropdown.component.html',
  styleUrls: ['./searchbar-dropdown.component.scss'],
  providers: [SearchService],
})
export class SearchbarDropdownComponent<T> {
  showSearchResults: boolean = false;
  searchInput: string = '';
  searchResults: Observable<SearchResult[]> = this.searchService.searchResults$;

  @Input()
  placeholder: string = '';

  @Output()
  searchEvent: EventEmitter<string> = new EventEmitter();

  @Output()
  selectEvent: EventEmitter<T> = new EventEmitter();

  constructor(private searchService: SearchService) {}

  public showResults(): void {
    this.showSearchResults = true;
  }

  public hideResults(): void {
    this.showSearchResults = false;
  }

  public fetchResults(searchCandidate: string): void {
    this.searchService.search(searchCandidate);
  }

  public handleSelect(selected: SearchResult): void {
    console.log('handleSelect selected', selected);
  }
}
