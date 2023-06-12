import { Component } from '@angular/core';
import { DatafetchService } from '../services/datafetch.service';


@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent {
  userSearch: string = '';
  searchBy: string = 'index';
  receivedCategory: string = '';

  constructor(private datafetchService: DatafetchService) {
  }

  onInputChange(event: Event) {
    this.userSearch = (event.target as HTMLInputElement).value;
  }

  onSelectChange(event: Event) {
    this.searchBy = (event.target as HTMLSelectElement).value;
  }

  onSearchButtonClick() {
    this.onSearchByChange;
    console.log(this.searchBy + this.userSearch + this.receivedCategory + this.searchBy);
    this.datafetchService.getDataByName(this.userSearch, this.searchBy);
  }

  onSearchByChange(searchBy: string) {
    this.receivedCategory = searchBy;
  }

}
