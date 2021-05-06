import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Some, SomeService } from "./some.service";

@Injectable()
export class SomeMockServiceService implements SomeService {
  constructor() {}

  getThem(): Observable<Some[]> {
    return of([
      {
        value: "fake!"
      }
    ]);
  }

  getOther(): Observable<Some[]> {
    return of([
      {
        value: "other"
      }
    ]);
  }
}
