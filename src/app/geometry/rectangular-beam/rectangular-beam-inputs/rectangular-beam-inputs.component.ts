import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommunicationService} from '../../../communication.service';

@Component({
  selector: 'app-rectangular-beam-inputs',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './rectangular-beam-inputs.component.html',
  styleUrl: './rectangular-beam-inputs.component.css'
})
export class RectangularBeamInputsComponent implements OnInit {
  @Output() beamWidthChanged = new EventEmitter<number>;
  @Output() beamDepthChanged = new EventEmitter<number>;

  width: number = 0;
  depth: number = 0;
  length: number = 0;

  constructor(private communicationService: CommunicationService) {
  }

  onWidthChanged() {
    this.communicationService.widthChanged.emit(this.width);
  }

  onDepthChanged() {
    this.communicationService.depthChanged.emit(this.depth);
  }

  ngOnInit() {
    const storedBeam = localStorage.getItem('selectedBeam');
    if (storedBeam) {
      //this.selectedBeam = JSON.parse(storedBeam);
    }
  }
}
