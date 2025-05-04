import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { FilterType } from '../../../shared/interfaces/continent-region-country.interfaces';
@Component({
  selector: 'app-toggle-switch',
  imports: [
    MatRadioModule,
    ReactiveFormsModule
  ],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss'
})
export class ToggleSwitchComponent implements OnInit {

  toggleFilterForm!: FormGroup;
  @Input() selectedFilter!: FilterType;
  @Output() filterChanged = new EventEmitter<FilterType>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.toggleFilterForm = this.fb.group({
      filterType: [this.selectedFilter]
    })
  }


  onRadioChange(event: MatRadioChange) {
    this.filterChanged.emit(event.value);
  }

}
