import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatafetchService } from '../services/datafetch.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css'],
  providers: [DatafetchService]
})
export class SearchComponentComponent {
  userSearch: string = '';

  @Output() searchButtonClick = new EventEmitter<{userSearch: string }>();

  @Input() receivedCategory: string;


  constructor(private datafetchService: DatafetchService) {
    this.receivedCategory = 'people';
  }

  onInputChange(event: Event) {
    this.userSearch = (event.target as HTMLInputElement).value;
  }



  onSearchButtonClick() {

    this.searchButtonClick.emit({ userSearch: this.userSearch });

  }

}
