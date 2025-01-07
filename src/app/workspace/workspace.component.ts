import {Component, OnInit} from '@angular/core';
import {CommunicationService} from '../communication.service';
import {GeometryComponent} from '../geometry/geometry.component';
import {HomeComponent} from '../home/home.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-workspace',
  imports: [
    GeometryComponent,
    HomeComponent,
    NgIf
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent implements OnInit {
  selectedComponent: string = 'Home';

  constructor(private communicationService: CommunicationService) {
  }

  ngOnInit() {
    this.communicationService.componentSelected.subscribe((page: string) => {
      console.log('Workspace received page click', page);
      this.selectedComponent = page;
    });
  }
}
