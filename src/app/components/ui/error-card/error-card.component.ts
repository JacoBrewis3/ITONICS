import { Component, Input } from '@angular/core';
import { ErrorObj } from '../../../store/state/world.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-card',
  imports: [
    CommonModule
  ],
  templateUrl: './error-card.component.html',
  styleUrl: './error-card.component.scss'
})
export class ErrorCardComponent {

  @Input() errorObj!: ErrorObj;

}
