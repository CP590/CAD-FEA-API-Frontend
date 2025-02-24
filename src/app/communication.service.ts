import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  componentSelected = new EventEmitter<string>();
  widthChanged = new EventEmitter<number>();
  depthChanged = new EventEmitter<number>();
  lengthChanged = new EventEmitter<number>();
}
