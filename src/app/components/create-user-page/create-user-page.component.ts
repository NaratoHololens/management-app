import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {showSnackMessage} from "../../util/index";
import {UserStateService} from "../../services/users-state.service";
import {User} from "../../model/user";
import {AuthContext} from "../../authentication/auth.context";

@Component({
  selector: 'create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.css']
})
export class CreateUserPageComponent implements OnInit {
  constructor(private titleService: Title, private userStateService: UserStateService,
              private authContext: AuthContext, private snackbar: MdSnackBar, private router: Router) {
    if(!authContext.isAuthenticated()){
        router.navigateByUrl('');
    }
    titleService.setTitle("Create new user...");
  }

  ngOnInit() {
  }

  saveUser(user: User){
    this.userStateService.saveUser(user).subscribe(
        () => {
        let snackConfig = new MdSnackBarConfig();
        snackConfig.duration = 500;
          this.snackbar.open("User saved!", "Close", snackConfig);
          this.router.navigateByUrl("/users");
        },
        err => {showSnackMessage(this.snackbar, "Failed to save user");
                //window.alert(err.toString());
        }
    );
  }

}
