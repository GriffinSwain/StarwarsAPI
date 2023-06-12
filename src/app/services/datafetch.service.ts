import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class DatafetchService {
  constructor(private http: HttpClient) {}

  // This function calls the API by page number
  getDataByPages(datatype: string, page: number): Observable<any> {
    return this.http
      .get<any>(`https://swapi.dev/api/${datatype}/?page=${page}`)
      .pipe(map((data) => Object.values(data)));
  }

  // This function calls the API by search query, as well as page number if the user wants to look past the first page
  getDataByName(datatype: string, name: string, page: number): Observable<any> {
    return this.http
      .get<any>(`https://swapi.dev/api/${datatype}/?search=${name}&page=${page}`)
      .pipe(map((data) => Object.values(data)));
  }
}
