import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatOption, MatSelect, MatLabel} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RectangularBeamInputsComponent} from './rectangular-beam/rectangular-beam-inputs/rectangular-beam-inputs.component';
import {RectangularBeamImageComponent} from './rectangular-beam/rectangular-beam-image/rectangular-beam-image.component';

@Component({
  selector: 'app-geometry',
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    NgForOf,
    FormsModule,
    RectangularBeamInputsComponent,
    NgIf,
    RectangularBeamImageComponent
  ],
  templateUrl: './geometry.component.html',
  styleUrl: './geometry.component.css'
})
export class GeometryComponent implements OnInit {
  @Input() beamList!: string[];
  @Output() selectedBeamChanged = new EventEmitter<any>;

  selectedBeam!: string;

    onBeamSelected(event: any) {
      this.selectedBeamChanged.emit(this.selectedBeam);
      localStorage.setItem('selectedBeam', JSON.stringify(this.selectedBeam));
    }

  ngOnInit() {
    const storedBeam = localStorage.getItem('selectedBeam');
    if (storedBeam) {
      this.selectedBeam = JSON.parse(storedBeam);
    }
  }
}
