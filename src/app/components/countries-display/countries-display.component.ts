import { Component, OnInit, ViewChild } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WorldViewModel, WorldSelectors } from './view-model/world.selectors';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ToggleSwitchComponent } from '../ui/toggle-switch/toggle-switch.component';
import { WorldActions } from '../../store/actions/world-actions';
import { D3ContainerWorld } from '../ui/d3-container/d3-container.component';
import { FilterType } from '../../shared/interfaces/continent-region-country.interfaces';
import { ErrorCardComponent } from '../ui/error-card/error-card.component';

@Component({
  selector: 'app-countries-display',
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    ToggleSwitchComponent,
    D3ContainerWorld,
    ErrorCardComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './countries-display.component.html',
  styleUrl: './countries-display.component.scss'
})
export class CountriesDisplayComponent implements OnInit {

  viewModel$!: Observable<WorldViewModel>;
  showFiller = true;
  @ViewChild('drawer')
  drawer!: MatSidenav;

  constructor(
    private store: Store,
    private actions$: Actions
  ) { }

  ngOnInit(): void {
    this.viewModel$ = this.store.select(WorldSelectors.getViewModel);

    this.actions$
    .pipe(
      ofActionDispatched(WorldActions.CountrySelected)
    )
    .subscribe(() => {
      this.drawer.open();
    })

  }
  closeSideNav() {
    this.drawer.close();
  }

  handleFilterChanged(event: FilterType) {
    this.drawer.close();
    this.store.dispatch(new WorldActions.FilterChanged(event));
  }

}
