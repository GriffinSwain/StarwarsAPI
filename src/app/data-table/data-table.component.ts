import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatafetchService } from '../services/datafetch.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs';
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


  Headers = Headers.Headers;
  columns = Headers.Headers[1].map(header => header.colDef);

  data$: Observable<any> | undefined;

  constructor(private datafetchService: DatafetchService) {
    this.tableData = new MatTableDataSource<any>();
  }

  // Header: string[][] = [
  //   ['name', 'birth year', 'gender', 'eye color'],
  //   ['name', 'diameter', 'climate', 'terrain'],
  //   ['name', 'starship class', 'cost (credits)', 'passengers', 'crew'],
  // ];

  logData() {
    console.log(this.tableData);
    console.log(Headers.Headers[0].map(header => header.colDef));
  }

  async ngOnInit() {
    console.log(Headers);
    this.datafetchService.getDataByPages('planets', 1).subscribe((data) => {
      this.tableData = data[3];
      console.log(this.tableData);
    });
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
