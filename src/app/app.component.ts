import { Component } from '@angular/core';
import {Calculator} from "./calculator"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testing-services';

  ngOnInit(){
    const calculator= new Calculator();

    const rtam = calculator.multiply(1,4);
    console.log(rtam === 4);

    const rtad = calculator.divide(1,0);
    console.log(rtad === null);
  }



}
