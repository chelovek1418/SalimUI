import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Perepel Ink';
  lat = 49.893387;
  lng = 36.450182;
  date = new Date().getFullYear();
}
