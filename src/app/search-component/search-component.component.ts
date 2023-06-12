import { Component, Input } from '@angular/core';
import { DatafetchService } from '../services/datafetch.service';


@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent {
  userSearch: string = '';
  searchBy: string = 'index';

  @Input() receivedCategory: string;

  constructor(private datafetchService: DatafetchService) {
    this.receivedCategory = 'people';
  }

  onInputChange(event: Event) {
    this.userSearch = (event.target as HTMLInputElement).value;
  }

  onSelectChange(event: Event) {
    this.searchBy = (event.target as HTMLSelectElement).value;
  }

  onSearchButtonClick() {
    // this.onCategoryChange(); // Add parentheses here
    console.log(this.searchBy + this.userSearch + this.receivedCategory);
    this.datafetchService.getDataByName(this.userSearch, this.searchBy);
  }

  // onCategoryChange(category: string) {
  //   this.receivedCategory = category;
  // }

}
