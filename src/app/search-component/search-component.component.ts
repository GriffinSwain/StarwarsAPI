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

  constructor(private datafetchService: DatafetchService) {
  }

  onInputChange(event: Event) {
    this.userSearch = (event.target as HTMLInputElement).value;
  }

  onSelectChange(event: Event) {
    this.searchBy = (event.target as HTMLSelectElement).value;
  }

  onSearchButtonClick() {
    this.datafetchService.getDataByName(this.userSearch, this.searchBy);
  }
}
