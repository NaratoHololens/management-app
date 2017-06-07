import {Component, EventEmitter, OnInit, Output, ViewChild, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'input-file-reader',
  templateUrl: './input-file-reader.component.html',
  styleUrls: ['./input-file-reader.component.css']
})

export class InputFileReaderComponent implements OnInit {
  @Input() buttonText: string = "Click";
  @Input() required: boolean = false;
  @Output() complete: EventEmitter<any> = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef;
  private photoSelected:boolean = false;

  constructor() {
  }

  ngOnInit(){
  }

  private selectFIle(){
    this.photoSelected = false;
    this.fileInput.nativeElement.click();
  }

  private changeListener($event: any) {
    let self = this;
    let file:File = $event.target.files[0];
    let myReader:FileReader = new FileReader();
    myReader.onloadend = () => {

      self.photoSelected = true;
      self.complete.emit(myReader.result);
    };
    myReader.readAsDataURL(file);
  }
}
