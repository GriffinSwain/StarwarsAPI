import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatafetchService } from '../services/datafetch.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  data$: Observable<any> | undefined;


  constructor(private datafetchService: DatafetchService) {
    // Inject the DatafetchService into the component
  }

  fetchData(): void {
    this.data$ = this.datafetchService.getDataByName('people', 'Luke');
    // Call the service method to fetch the data
  }

}
