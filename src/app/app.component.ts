import {Component, OnInit} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {SidebarComponent} from './sidebar/sidebar.component';
import {WorkspaceComponent} from './workspace/workspace.component';
import {HeaderComponent} from './header/header.component';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  imports: [MatSidenavContainer, SidebarComponent, MatSidenav, MatSidenavContent, WorkspaceComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'CAD-FEA-API';
  message = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getRoot().subscribe(
      (response) => {
        this.message = response;
        console.log(this.message);
      },
      (error) => {
        console.error('Error fetching message: ', error);
      }
    );
  }
}
