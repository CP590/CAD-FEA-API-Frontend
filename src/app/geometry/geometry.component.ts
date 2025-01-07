import { Component } from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatOption, MatSelect, MatLabel} from '@angular/material/select';

@Component({
  selector: 'app-geometry',
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel
  ],
  templateUrl: './geometry.component.html',
  styleUrl: './geometry.component.css'
})
export class GeometryComponent {

}
