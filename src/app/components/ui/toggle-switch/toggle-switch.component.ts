import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
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
  @Input() selectedFilter!: string;
  @Output() filterChanged = new EventEmitter<string>();

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
