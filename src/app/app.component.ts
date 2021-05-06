import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Some, SomeService } from './some.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mock';
  public some$: Observable<Some[]>;
  public other$: Observable<Some[]>;
  constructor(private someSvc: SomeService) {
    this.some$ = someSvc.getThem();
    this.other$ = someSvc.getOther();
  }
}
