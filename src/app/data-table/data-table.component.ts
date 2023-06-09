import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { DatafetchService } from '../services/datafetch.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Headers } from '../Constants/headers-constant';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  providers: [DatafetchService],
})
export class DataTableComponent implements OnInit {
  @Input() tableData: MatTableDataSource<any>;

  @Output() backgroundMusicChange = new EventEmitter<string>();

  @Output() categorySearchChange = new EventEmitter<string>();

  paginationId = 'data-table-pagination';
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  collectionSize: number;
  headerArray = 0;
  categorySearch = 'people';
  peopleButton = 'star-wars-button-selected';
  planetsButton = 'star-wars-button';
  starshipsButton = 'star-wars-button';
  search = false;
  searchValue = '';
  Headers = Headers.Headers;
  columns = Headers.Headers[0].map((header) => header.colDef);

  data$: Observable<any> | undefined;

  constructor(private datafetchService: DatafetchService) {
    this.collectionSize = 0;
    this.totalItems = 0;
    this.tableData = new MatTableDataSource<any>();
    this.peopleButton = 'star-wars-button-selected';
    this.planetsButton = 'star-wars-button';
    this.starshipsButton = 'star-wars-button';
  }

  // Loads the data from the API and gets buttons to display
  ngOnInit() {
    this.loadData(this.categorySearch, this.currentPage);
    this.getTotalNumberPages()
    this.getArrayOfPages();
  }

  // Loads data from the API based on the parameters of datatype (people, planets, or starships) and displays it & buttons
  loadData(datatype: string, page: number) {
    this.datafetchService.getDataByPages(datatype, page).subscribe((data) => {
      this.totalItems = data[0];
      this.tableData = new MatTableDataSource<any>(data[3]);
      this.getTotalNumberPages();
    });
  }

  // Gets value from user input and displays the search result based on that input
  // This is only ran the first time a user searches something so currentpage is set to 1
  searchResults( userSearch: any) {
    this.searchValue= userSearch;
    this.currentPage = 1;
    this.datafetchService.getDataByName(this.categorySearch, userSearch, this.currentPage).subscribe((data) => {
      this.totalItems = data[0];
      this.tableData = new MatTableDataSource<any>(data[3]);
      this.getTotalNumberPages();
      this.getArrayOfPages()
    });
    this.search = true;
  }

  // This finds the total number of pages (10 results per page) that the data can fill
  getTotalNumberPages() {
    this.totalPages = Math.ceil(this.totalItems / 10);
  }

  // This makes an array of the total number of pages for the button's Ngfor to display
  getArrayOfPages(): number[] {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  // This is for when the user searches by people. It calles the api and changes the background and music according to which category it is.
  peopleSearch() {
    this.categorySearch = 'people';
    this.buttonSelected('people');
    this.currentPage = 1;
    this.backgroundMusicChange.emit('people');
    this.categorySearchChange.emit(this.categorySearch);
    this.headerArray = 0;
    this.columns = Headers.Headers[this.headerArray].map(
      (header) => header.colDef
    );
    this.loadData('people', 1);
  }

  // This is for when the user searches by planets. It calles the api and changes the background and music according to which category it is.
  planetSearch() {
    this.categorySearch = 'planets';
    this.buttonSelected('planets');
    this.currentPage = 1;
    this.backgroundMusicChange.emit('planets');
    this.categorySearchChange.emit(this.categorySearch);
    this.headerArray = 1;
    this.columns = Headers.Headers[this.headerArray].map(
      (header) => header.colDef
      );
      this.loadData('planets', 1);
    }

   // This is for when the user searches by planets. It calles the api and changes the background and music according to which category it is.
    starshipSearch() {
      this.categorySearch = 'starships';
      this.buttonSelected('starships');
      this.currentPage = 1;
      this.backgroundMusicChange.emit('starships');
      this.categorySearchChange.emit(this.categorySearch);
    this.headerArray = 2;
    this.columns = Headers.Headers[this.headerArray].map(
      (header) => header.colDef
    );
    this.loadData('starships', 1);
  }

  // This checks which button has been pressed and gives it a selected color so the user knows what option has been selected
  buttonSelected(selectedButton: string) {
    this.search = false;
    this.planetsButton = 'star-wars-button';
    this.peopleButton = 'star-wars-button';
    this.starshipsButton = 'star-wars-button';
    this.tableData = new MatTableDataSource<any>();

    this.categorySearchChange.emit(this.categorySearch);
    this.totalPages = 0;
    this.getArrayOfPages();

    switch (selectedButton) {
      case 'people':
        this.peopleButton = 'star-wars-button-selected';
        break;
      case 'planets':
        this.planetsButton = 'star-wars-button-selected';
        break;
      case 'starships':
        this.starshipsButton = 'star-wars-button-selected';
        break;
      default:
        break;
    }
  }

  // This is called when a page button is pressed. It checks if the user has searched or if all the data is being displayed.
  pageButton(page: number){
    this.tableData = new MatTableDataSource<any>();
    if (!this.search){
      this.loadData(this.categorySearch, page);
      this.currentPage = page;
    }else{
      console.log('search page' + this.categorySearch + this.searchValue)
      this.currentPage = page;
      this.datafetchService.getDataByName(this.categorySearch, this.searchValue, page).subscribe((data) => {
        this.totalItems = data[0];
        this.tableData = new MatTableDataSource<any>(data[3]);
        this.getTotalNumberPages();
        this.getArrayOfPages();
        console.log(data[0]);
      });
    }
  }

}
