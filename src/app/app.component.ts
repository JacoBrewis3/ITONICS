import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Store } from '@ngxs/store';
import { WorldActions } from './store/actions/world-actions';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ITONICS-assessment';

  constructor(private store: Store) {

      // load the data into the state
    this.store.dispatch(new WorldActions.Fetch());

  }
}
