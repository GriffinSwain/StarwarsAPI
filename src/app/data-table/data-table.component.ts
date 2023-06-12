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

  @Output() searchByChange = new EventEmitter<string>();

  paginationId = 'data-table-pagination';
  totalItems: number = 60;
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  collectionSize: number;
  headerArray = 0;
  searchBy = 'people';
  peopleButton = 'star-wars-button-selected';
  planetsButton = 'star-wars-button';
  starshipsButton = 'star-wars-button';
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

  logData() {
    console.log(this.Headers);
    console.log(
      Headers.Headers[this.headerArray].map((header) => header.colDef)
    );
    console.log(Headers.Headers[0].map((header) => header.colDef));
    console.log(Headers.Headers[1].map((header) => header.colDef));
    console.log(Headers.Headers[2].map((header) => header.colDef));
  }

  ngOnInit() {
    this.loadData(this.searchBy, this.currentPage);
    console.log(this.totalItems);
    this.getNumberPages()
    this.getPageNumbers();
  }

  loadData(datatype: string, page: number) {
    this.datafetchService.getDataByPages(datatype, page).subscribe((data) => {
      console.log(data[0]);
      this.totalItems = data[0];
      this.tableData = new MatTableDataSource<any>(data[3]);
      // this.tableData = data[3];
      // this.getPageNumbers()
      console.log(this.tableData);
      this.getNumberPages();
    });
  }

  getNumberPages() {
    this.totalPages = Math.ceil(this.totalItems / 10);
  }

  getPageNumbers(): number[] {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    console.log(this.totalPages)
    console.log(pageNumbers);
    return pageNumbers;
  }

  peopleSearch() {
    this.buttonSelected('people');
    this.currentPage = 1;
    this.backgroundMusicChange.emit('people');
    this.searchBy = 'people';
    this.searchByChange.emit(this.searchBy);
    this.headerArray = 0;
    this.columns = Headers.Headers[this.headerArray].map(
      (header) => header.colDef
    );
    this.loadData('people', 1);
  }

  planetSearch() {
    this.buttonSelected('planets');
    this.currentPage = 1;
    this.backgroundMusicChange.emit('planets');
    this.searchByChange.emit(this.searchBy);
    this.searchBy = 'planets';
    this.headerArray = 1;
    this.columns = Headers.Headers[this.headerArray].map(
      (header) => header.colDef
      );
      this.loadData('planets', 1);
    }

    starshipSearch() {
      this.buttonSelected('starships');
      this.currentPage = 1;
      this.backgroundMusicChange.emit('starships');
      this.searchByChange.emit(this.searchBy);
      this.searchBy = 'starships';
    this.headerArray = 2;
    this.columns = Headers.Headers[this.headerArray].map(
      (header) => header.colDef
    );
    this.loadData('starships', 1);
  }

  buttonSelected(selectedButton: string) {
    this.planetsButton = 'star-wars-button';
    this.peopleButton = 'star-wars-button';
    this.starshipsButton = 'star-wars-button';
    this.tableData = new MatTableDataSource<any>();
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

  buttonTest(page: number){
    this.loadData(this.searchBy, page);
    this.currentPage = page;
  }

  async fetchDataTable(
    datatype: string,
    info: any,
    type: string
  ): Promise<void> {
    if (type == 'index') {
      this.datafetchService.getDataByIndex(datatype, info).subscribe((data) => {
        this.tableData.data = data;
        console.log(this.tableData.data);
      });
    } else {
      this.datafetchService
        .getDataByName(datatype, info)
        .pipe(first())
        .subscribe((data) => {
          this.tableData.data = data;
        });
    }
  }
}
