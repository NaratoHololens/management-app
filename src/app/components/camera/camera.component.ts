import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'camera-component',
  templateUrl: 'camera.component.html',
  styleUrls: ['camera.component.css']
})
export class CameraComponent implements OnInit {
  private hideVideoEle: boolean = false;
  private canvasElement: HTMLCanvasElement;
  @Input() private showButtons: boolean = true;
  @Output() photoSelected: EventEmitter<string> = new EventEmitter();

  @ViewChild('video') video: ElementRef;
  @ViewChild('photoCanvas') canvas: ElementRef;

  constructor() {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const self = this;
    let _video = this.video.nativeElement;
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            _video.src = window.URL.createObjectURL(stream);
            _video.play();
            //stream.getVideoTracks().
          })
    }
  }

  public takePicture(){
    if (this.video.nativeElement) {
      this.canvasElement = this.canvas.nativeElement;
      let context = this.canvasElement.getContext("2d");

      this.canvasElement.width = this.video.nativeElement.width;
      this.canvasElement.height = this.video.nativeElement.height;
      context.drawImage(this.video.nativeElement, 0, 0);
      //this.canvasElement.nativeElement.getContext('2d').scale(2,2);
      this.setPhoto();
    }

    this.hideVideoEle = true;
  }

  public newPicture(){
    this.hideVideoEle = false;
  }

  private setPhoto(){
    if(this.canvasElement != null){
      let dataUrl = this.canvasElement.toDataURL();
      this.photoSelected.emit(dataUrl);
      //async(this.photoSelected.emit(dataUrl));
      //let bool = dataUrl.indexOf('data:image/png') === 0;
      /*let img = document.createElement('img');
      img.src = dataUrl;
      let output = document.querySelector('.output');
      output.innerHTML = '';
      output.innerHTML = dataUrl;
      /*output.appendChild(img);*/
    }
  }
}
