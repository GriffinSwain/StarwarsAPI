import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class DatafetchService {
  constructor(private http: HttpClient) {}

  getDataByPages(datatype: string, page: number): Observable<any> {
    return this.http
      .get<any>(`https://swapi.dev/api/${datatype}/?page=${page}`)
      .pipe(map((data) => Object.values(data)));
  }

  getDataByIndex(datatype: string, input: any): Observable<any> {
    return this.http
      .get<any>(`https://swapi.dev/api/${datatype}/${input}`)
      .pipe(map((data) => Object.values(data)));
  }

  getDataByName(datatype: string, name: string): Observable<any> {
    return this.http
      .get<any>(`https://swapi.dev/api/${datatype}/?search=${name}`)
      .pipe(map((data) => Object.values(data)));
  }
}
