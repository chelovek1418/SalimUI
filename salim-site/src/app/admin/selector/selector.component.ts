import { Component } from '@angular/core';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html'
})
export class SelectorComponent {

  constructor(private dateService: DateService) { }

  go(dir: number){
    this.dateService.changeMonth(dir)
  }

}
