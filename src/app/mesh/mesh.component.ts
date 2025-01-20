import { Component } from '@angular/core';
import {ThreeDRendererComponent} from './three-d-renderer/three-d-renderer.component';

@Component({
  selector: 'app-mesh',
  imports: [
    ThreeDRendererComponent
  ],
  templateUrl: './mesh.component.html',
  styleUrl: './mesh.component.css'
})
export class MeshComponent {

}
