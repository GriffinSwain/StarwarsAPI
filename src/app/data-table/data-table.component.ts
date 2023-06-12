import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatafetchService } from '../services/datafetch.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs';
import {NgxPaginationModule} from 'ngx-pagination';
import { PaginationControlsComponent } from 'ngx-pagination';
import { MatTableDataSource } from '@angular/material/table';
import { Headers } from '../Constants/headers-constant';

function DataFetch(http: HttpClient) {
  return new DatafetchService(http);
}

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

  ngOnInit() {
    this.loadData(this.categorySearch, this.currentPage);
    this.getNumberPages()
    this.getPageNumbers();
  }

  loadData(datatype: string, page: number) {
    this.datafetchService.getDataByPages(datatype, page).subscribe((data) => {
      this.totalItems = data[0];
      this.tableData = new MatTableDataSource<any>(data[3]);
      this.getNumberPages();
    });
  }

  searchResults( userSearch: any) {
    this.searchValue= userSearch;
    this.currentPage = 1;
    this.datafetchService.getDataByName(this.categorySearch, userSearch, this.currentPage).subscribe((data) => {
      this.totalItems = data[0];
      this.tableData = new MatTableDataSource<any>(data[3]);
      this.getNumberPages();
      console.log("total "+this.totalPages);
      this.getPageNumbers()
    });
    this.search = true;
  }

  getNumberPages() {
    this.totalPages = Math.ceil(this.totalItems / 10);
  }

  getPageNumbers(): number[] {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    console.log(pageNumbers);
    return pageNumbers;
  }

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

  buttonSelected(selectedButton: string) {
    this.search = false;
    this.planetsButton = 'star-wars-button';
    this.peopleButton = 'star-wars-button';
    this.starshipsButton = 'star-wars-button';
    this.tableData = new MatTableDataSource<any>();
    console.log(this.categorySearch);
    this.categorySearchChange.emit(this.categorySearch);
    this.totalPages = 0;
    this.getPageNumbers();

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
        this.getNumberPages();
        this.getPageNumbers();
        console.log(data[0]);
      });
    }
  }

}
