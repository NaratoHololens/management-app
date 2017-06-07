import {Component, OnInit} from '@angular/core';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {showSnackMessage} from "../../util/index";
import {UserStateService} from "../../services/users-state.service";
import {User} from "../../model/user";
import {AuthContext} from "../../authentication/auth.context";
import {Router} from "@angular/router";

@Component({
  selector: 'user-page',
  templateUrl: 'userlist-page.component.html',
  styleUrls: ['userlist-page.component.css']
})
export class UserPageComponent implements OnInit {
  public currentUserList: User[] = [];
  constructor(private authContext: AuthContext, private userStateService: UserStateService,
              private snackbar: MdSnackBar, router: Router) {
    if(!authContext.isAuthenticated()){
      router.navigateByUrl('');
    }
    else{
      this.loadUsers();
    }
  }

  ngOnInit() {
    //this.loadUsers();
  }

  private loadUsers(){
    this.userStateService.getUsers().subscribe(
        users => this.currentUserList = users,
        () => showSnackMessage(this.snackbar, "Failed to load users")
    );
  }

  private deleteUser(user: User){
    this.userStateService.deleteUser(user).subscribe(
        () => {
          let snackConfig = new MdSnackBarConfig();
          snackConfig.duration = 500;
          this.snackbar.open("User deleted", "Close", snackConfig);
          //this.loadUsers();
        },
        () => showSnackMessage(this.snackbar,"Failed to delete user")
    );
  }

}
