import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let isMock = false;
    // only way to interact with interceptors atm
    if (req.params.get("mock-it")) {
      isMock = true;
      // and you wanna rremove your custom params before sending to your API
      req = req.clone({
        params: req.params.delete("mock-it")
      });
    }

    return next.handle(req).pipe(
      map((v: HttpResponse<any>) => {
        if (isMock) {
          // some reason it doesn't send an angular HttpResponse object so this is the best way to
          // mock the response. would love to use  v.clone({ body: [{ value: "mock it!" }] });
          return new HttpResponse({
            body: [{ value: "mock it!" }],
            status: v.status,
            statusText: v.statusText,
            headers: v.headers,
            url: v.url
          });
        }
        return v;
      })
    );
  }
}
