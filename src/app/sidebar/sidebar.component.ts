import { Component } from '@angular/core';
import {MatListItem, MatNavList} from '@angular/material/list';
import {CommunicationService} from '../communication.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatNavList,
    MatListItem,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private communicationService: CommunicationService) {
  }

  onItemClick(component: string) {
    this.communicationService.componentSelected.emit(component);
  }
}
