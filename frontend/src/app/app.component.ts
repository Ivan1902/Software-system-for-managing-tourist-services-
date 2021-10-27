import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}

export class UIStateService {
  pageOneSelectedTab = 0;
  pageTwoSelectedTab = 0;
  constructor() {}
}
