import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DatafetchService {

  constructor(private http:HttpClient) {
    // let res = this.http.get<any>('https://swapi.dev/api/people/1')
    // .pipe(
    //   tap(console.log),
    //   map(data => Object.values(data))
    // )
    // .subscribe();
  }

  getDataByIndex(datatype: string, input: number): Observable<any>{
    return this.http.get<any>(`https://swapi.dev/api/${datatype}/${input}`)
    .pipe(
      tap(console.log),
      map(data => Object.values(data))
    );
    }

  getDataByName(datatype: string, name: string): Observable<any>{
    return this.http.get<any>(`https://swapi.dev/api/${datatype}/?search=${name}`)
    .pipe(
      tap(console.log),
      map(data => Object.values(data))
    );
    }


}