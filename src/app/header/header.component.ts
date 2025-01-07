import {Component, OnInit} from '@angular/core';
import {CommunicationService} from '../communication.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  selectedComponent: string = 'Home';

  constructor(private communicationService: CommunicationService) {
  }

  ngOnInit() {
    this.communicationService.componentSelected.subscribe((page: string) => {
      this.selectedComponent = page;
    });
  }
}
