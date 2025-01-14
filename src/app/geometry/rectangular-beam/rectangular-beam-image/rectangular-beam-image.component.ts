import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {CommunicationService} from '../../../communication.service';

@Component({
  selector: 'app-rectangular-beam-image',
    imports: [
    ],
  templateUrl: './rectangular-beam-image.component.html',
  styleUrl: './rectangular-beam-image.component.css'
})
export class RectangularBeamImageComponent implements OnInit {
  width: number = 0;
  depth: number = 0;

  constructor(private communicationService: CommunicationService) {
  }

  ngOnInit() {
    this.communicationService.widthChanged.subscribe((width: number) => {
      this.width = width;
      });
    this.communicationService.depthChanged.subscribe((depth: number) => {
      this.depth = depth;
    });
  }
}
