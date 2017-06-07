import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {MdSnackBar} from "@angular/material";
import {showSnackMessage} from "../../util/index";
import {UserStateService} from "../../services/users-state.service";
import {User} from "../../model/user";
import {AuthContext} from "../../authentication/auth.context";

@Component({
  selector: 'user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css', '../create-user-page/create-user-page.component.css']
})
export class UserDetailPageComponent implements OnInit {
  public existingUser: User = new User();
  constructor(private titleService: Title, private userStateService: UserStateService, private authContext: AuthContext,
              private snackbar: MdSnackBar, private route: ActivatedRoute, router: Router) {
      if(!authContext.isAuthenticated()){
          router.navigateByUrl('');
      }
      else {
          titleService.setTitle("User info");
          const self = this;
          this.route.params.subscribe(params =>
              self.userStateService.getUser(params['id']).subscribe(
                  user => {
                      this.existingUser = user;
                      titleService.setTitle("User info of " + user.firstname + " " + user.lastname);
                  },
                  () => showSnackMessage(this.snackbar, "Failed to load user")
              ));
      }
  }

  ngOnInit() {
  }

}
