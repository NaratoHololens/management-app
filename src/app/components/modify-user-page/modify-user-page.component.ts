import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {showSnackMessage} from "../../util/index";
import {UserStateService} from "../../services/users-state.service";
import {User} from "../../model/user";
import {AuthContext} from "../../authentication/auth.context";

@Component({
  selector: 'modify-user-page',
  templateUrl: 'modify-user-page.component.html',
  styleUrls: ['modify-user-page.component.css', '../create-user-page/create-user-page.component.css']
})
export class ModifyUserPageComponent implements OnInit {
  public existingUser: User = new User();

  constructor(private titleService: Title, private userStateService: UserStateService, private authContext: AuthContext,
              private snackbar: MdSnackBar, private route: ActivatedRoute, private router: Router) {
    if(!authContext.isAuthenticated()){
        router.navigateByUrl('');
    }
    else{
        titleService.setTitle("Modify user");
        const self = this;
        this.route.params.subscribe(params =>
            self.userStateService.getUser(params['id']).subscribe(
                user => {
                    this.existingUser = user;
                    titleService.setTitle("Modify " + user.firstname + " " + user.lastname);
                },
                () => showSnackMessage(this.snackbar, "Failed to load user")
            ));
    }
  }

  ngOnInit() {
  }

  saveUser(user: User){
      this.userStateService.updateUser(user).subscribe(
          () => {
              let snackConfig = new MdSnackBarConfig();
              snackConfig.duration = 500;
              this.snackbar.open("User saved!", "Close", snackConfig);
              this.router.navigateByUrl("/users");
          },
          () => showSnackMessage(this.snackbar, "Failed to save user")
      );
  }
}
