import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommunicationService} from '../../../communication.service';
import {RectangularBeamData} from '../rectangular-beam-data';
import {ApiService} from '../../../api.service';

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

  private endpoint = 'set_step_parameters'

  rectangularBeamData: RectangularBeamData = {
    cross_section: 'rectangular',
    width: 0,
    depth: 0,
    length: 0,
  };

  rectangularBeamForm: FormGroup;

  constructor(private communicationService: CommunicationService,
              private apiService: ApiService,
              private fb: FormBuilder) {
    this.rectangularBeamForm = this.fb.group({
      cross_section: ['rectangular'],
      width: [0],
      depth: [0],
      length: [0],
    });
  }

  onWidthChanged() {
    this.communicationService.widthChanged.emit(this.rectangularBeamData.width);
  }

  onDepthChanged() {
    this.communicationService.depthChanged.emit(this.rectangularBeamData.depth);
  }

  ngOnInit() {
    const storedBeam = localStorage.getItem('selectedBeam');
    if (storedBeam) {
      //this.selectedBeam = JSON.parse(storedBeam);
    }
  }
    sendData() {
      const jsonData = JSON.stringify(this.rectangularBeamData);
      this.apiService.sendData(this.endpoint, jsonData).subscribe({
        next: (response) => console.log('Data send successfully: ', response),
        error: (err) => console.error('Error sending data: ', err),
      });
    }
}
