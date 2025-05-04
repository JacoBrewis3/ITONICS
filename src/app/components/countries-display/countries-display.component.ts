import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Actions, ofActionCompleted, ofActionDispatched, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WorldViewModel, WorldSelectors } from './view-model/world.selectors';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
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
export class CountriesDisplayComponent implements OnInit {

  viewModel$!: Observable<WorldViewModel>;
  showFiller = true;
  @ViewChild('drawer',)
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
    console.log('closing');
    this.drawer.close();
  }

  handleFilterChanged(event: string) {
    this.store.dispatch(new WorldActions.FilterChanged(event));
  }

}
