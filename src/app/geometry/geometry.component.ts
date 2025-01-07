import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatOption, MatSelect, MatLabel} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-geometry',
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    NgForOf,
    FormsModule
  ],
  templateUrl: './geometry.component.html',
  styleUrl: './geometry.component.css'
})
export class GeometryComponent {
  @Input() beamList!: string[];
  @Output() selectedBeamChanged = new EventEmitter<any>;

  selectedBeam!: string;

  onBeamSelected(event: any) {
    console.log('Selected Beam:', this.selectedBeam);
    this.selectedBeamChanged.emit(this.selectedBeam);
  }
}
