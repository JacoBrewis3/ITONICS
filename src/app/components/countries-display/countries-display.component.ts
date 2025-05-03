import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WorldViewModel, WorldSelectors } from './view-model/world.selectors';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ToggleSwitchComponent } from '../ui/toggle-switch/toggle-switch.component';
import { WorldActions } from '../../store/actions/world-actions';
import * as d3 from "d3";
import { D3ContainerWorld } from '../ui/d3-container/d3-container.component';

@Component({
  selector: 'app-countries-display',
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    ToggleSwitchComponent,
    D3ContainerWorld
  ],
  templateUrl: './countries-display.component.html',
  styleUrl: './countries-display.component.scss'
})
export class CountriesDisplayComponent implements OnInit,  AfterViewInit {

  viewModel$!: Observable<WorldViewModel>;
  showFiller  = true;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.viewModel$ = this.store.select(WorldSelectors.getViewModel);
  }

  ngAfterViewInit(): void {

  }

  handleFilterChanged(event: string) {
        this.store.dispatch(new WorldActions.FilterChanged(event));
  }

}
