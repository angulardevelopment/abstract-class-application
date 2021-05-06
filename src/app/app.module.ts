import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { SomeService, SomeServiceService } from './some.service';
import { SomeMockServiceService } from './some-mock-service.service';
import { MockApiInterceptor } from './mock-api.interceptor';

export const USE_FAKE = new InjectionToken<boolean>(
  "this-can-be-a-service-or-just-use-environment-variable-as-value"
);

export const SomeServiceFactory = (
  isFake: boolean,
  httpClient: HttpClient
): SomeService => {
  console.log(httpClient);
  if (isFake) {
    return new SomeMockServiceService();
  } else {
    return new SomeServiceService(httpClient);
  }
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
     HttpClientModule
  ],
  providers: [
    {
      provide: USE_FAKE,
      useValue: false // switch this to see how it works
    },
    {
      provide: SomeService,
      useFactory: SomeServiceFactory,
      deps: [USE_FAKE, HttpClient]

    },
    { provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
