import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorldSelectors, WorldViewModel } from '../countries-display/view-model/world.selectors';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-country-detaills',
  imports: [],
  templateUrl: './country-detaills.component.html',
  styleUrl: './country-detaills.component.scss'
})
export class CountryDetaillsComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit(): void {
   
  }

}
