import {Component, OnInit, ViewChild} from '@angular/core';
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {showSnackMessage} from "../../util/index";
import {CameraComponent} from "../camera/camera.component";
import {EditUserFormComponent} from "../edit-user-form/edit-user-form.component";
import {UserStateService} from "../../services/users-state.service";
import {PersonlookupRequestService} from "../../services/personLookupRequest.service";
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'interactive-page',
  templateUrl: 'interactive-page.component.html',
  styleUrls: ['interactive-page.component.css']
})
export class InteractivePageComponent implements OnInit {
    private actionHeader: string = "Register";
    private currentUser: User = new User();
    private registerMode: boolean = true;

    @ViewChild('cameraComponent') cameraComp: CameraComponent;
    @ViewChild('userForm') userForm: EditUserFormComponent;

  constructor(private titleService: Title, private discoService: PersonlookupRequestService, private userService: UserService,
              private userStateService: UserStateService, private snackbar: MdSnackBar, private router: Router) {
    titleService.setTitle("Register!");
  }

  ngOnInit() {
  }

  private sendPhotoTrigger(bool: boolean){
      if(bool){
          this.cameraComp.takePicture();
      }
      else{
          this.cameraComp.newPicture();
      }
  }
  private sendSaveUserTriger(bool: boolean){
      if(this.registerMode && (this.currentUser.photoString == "" || this.currentUser.photoString == null)){
          showSnackMessage(this.snackbar, "Please take a picture first.");
          return;
      }
      this.userForm.saveUser();
  }

  private saveUser(user: User){
      if(this.registerMode){
          this.userStateService.saveUser(user).subscribe(
              () => this.succesSaveCallback(),
              err => this.errSaveCallback(err)
          );
      }
      else{
          this.userStateService.updateUser(user).subscribe(
              () => this.succesSaveCallback(),
              err => this.errSaveCallback(err)
          );
      }
  }

  private setPhoto(photoString: string){
      this.currentUser.photoString = photoString;

      this.discoService.detectUser(photoString).subscribe(
          user => {
                    this.currentUser = user;
                    this.titleService.setTitle("Modify " + user.firstname + " " + user.lastname);
                    this.changeToModifyMode()},
          () =>{
              if(!this.registerMode) {
                  showSnackMessage(this.snackbar, "User not found, please register");
                  this.changeToRegisterMode();
              }
          }
      );
  }

  private changeToModifyMode(){
      this.currentUser.photoString = "";
      this.registerMode = false;
      this.actionHeader = "Modify";
  }
  private changeToRegisterMode(){
      let tempPhoto = this.currentUser.photoString;
      this.currentUser = new User();
      this.currentUser.photoString = tempPhoto;
      this.registerMode = true;
      this.actionHeader = "Register";
      this.titleService.setTitle("Register!");
  }

  private succesSaveCallback(){
      let snackConfig = new MdSnackBarConfig();
      snackConfig.duration = 500;
      this.snackbar.open("User saved!", "Close", snackConfig);
      location.reload();
  }
  private errSaveCallback(err: any){
      showSnackMessage(this.snackbar, "Failed to save user");
  }
}
