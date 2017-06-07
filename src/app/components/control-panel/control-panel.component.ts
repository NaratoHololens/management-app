import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  private pictureTaken: boolean = false;
  @Output() public photoTaken: EventEmitter<boolean> = new EventEmitter();
  @Output() public userSavePressed: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  private takePicture(){
    this.pictureTaken = !this.pictureTaken;
    this.photoTaken.emit(this.pictureTaken);
  }
  private saveUser(){
    this.userSavePressed.emit(true);
  }
}
