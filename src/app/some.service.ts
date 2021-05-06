import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Some {
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export abstract class SomeService {

  constructor() { }

  abstract getThem(): Observable<Some[]>;

  abstract getOther(): Observable<Some[]>;
}

export class SomeServiceService implements SomeService {
  constructor(private http: HttpClient) {}

  getOther(): Observable<Some[]> {
    // this sets the mock as you can see it will be a diff value from getThem
    const params = new HttpParams().append("mock-it", "true");
    return this.http.get<Some[]>(
      "https://run.mocky.io/v3/08d65f6a-c99c-41e7-920a-b71b4eb0646c",
      { params }
    );
  }

  getThem(): Observable<Some[]> {
    return this.http.get<Some[]>(
      "https://run.mocky.io/v3/08d65f6a-c99c-41e7-920a-b71b4eb0646c"
    );
  }
}

// https://run.mocky.io/v3/08d65f6a-c99c-41e7-920a-b71b4eb0646c
// [
//   { "value": "hello" },
//   { "value": "world" }
//   ]
