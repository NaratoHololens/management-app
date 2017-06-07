import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MdSnackBar} from "@angular/material";
import {showSnackMessage} from "../../util/index";
import {User} from "../../model/user";

@Component({
  selector: 'edit-user-form',
  templateUrl: 'edit-user-form.component.html',
  styleUrls: ['edit-user-form.component.css']
})
export class EditUserFormComponent implements OnInit {
  @Input() public currentUser: User = new User();
  @Input() private editable: boolean = true;
  @Input() private showFileButton: boolean = true;
  @Input() private showSaveButton: boolean = true;
  @Input() private photoRequired: boolean = true;
  @Output() public userSavedEvent: EventEmitter<User> = new EventEmitter();

  private photoTitle:string = "Select photo";
  private currentdate: Date = new Date();
  private yearRange: string = "";
  private formDate: Date = new Date();

  constructor(private snackbar: MdSnackBar) {
    let maxyear = this.currentdate.getFullYear();
    let startyear = maxyear - 100;
    this.yearRange = maxyear + ":" + startyear;
  }

  ngOnInit() {
  }
  ngOnChanges(){
    this.dateLoaded();
  }

  private dateLoaded(){
    if(this.currentUser.birthday != null){
      this.formDate = new Date((this.currentUser.birthday || "").replace(/-/g,"/").replace(/[TZ]/g," "));
    }
  }

  private dateChanged(){
    if(this.currentUser.birthday != null || this.formDate != null){
      //set hours to 0 and day +1, otherwise it's saved as selectedDay-1
      this.formDate.setUTCHours(0,0,0,0);
      this.formDate.setDate(this.formDate.getDate()+1);
      this.currentUser.birthday = this.formDate.toISOString();
    }
  }

  public saveUser(){
    if(this.checkUserValid()){
      this.userSavedEvent.emit(this.currentUser);
    }
    else{
      showSnackMessage(this.snackbar, "Please fill in all fields");
    }
  }

  private checkUserValid(): boolean{
    this.dateChanged();
    if (this.currentUser.firstname == null || this.currentUser.firstname == "")
      return false;
    if (this.currentUser.lastname == null || this.currentUser.lastname == "")
      return false;
    if (this.currentUser.professionalOccupation == null || this.currentUser.professionalOccupation == "")
      return false;
    if (this.currentUser.birthday == null)
      return false;
    if(this.photoRequired){
      return (this.currentUser.photoString != null && this.currentUser.photoString != "");
    }
    return true;
  }

  private setPhoto($event): void{
    this.currentUser.photoString = $event;
  }

  private changeListener($event) : void {
    this.readThis($event.target);
  }

  private readThis(inputValue: any) : void {
    const self = this;
    let file:File = inputValue.files[0];
    let myReader:FileReader = new FileReader();

    myReader.onloadend = function(e){
      // you can perform an action with readed data here
      console.log(myReader.result);
    };

    myReader.readAsDataURL(file);
    //myReader
  }
}
