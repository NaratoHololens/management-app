import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {MdSnackBar} from "@angular/material";
import {showSnackMessage} from "../../util/index";
import {UserStateService} from "../../services/users-state.service";
import {LogService} from "../../services/log.service";
import {LogCount} from "../../model/logCount";
import {User} from "../../model/user";
import {AuthContext} from "../../authentication/auth.context";
/**
 * Created by nadya on 8/05/2017.
 */

@Component({
  selector: 'statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})

export class StatisticsPageComponent implements OnInit {
  public logCount: LogCount;
  public user: User;
  constructor(private titleService: Title, private logService:LogService, private userStateService:UserStateService,
              private authContext: AuthContext, private snackbar:MdSnackBar, private route:ActivatedRoute, private router: Router)
  {
    this.user = new User();
    if(!authContext.isAuthenticated()){
        router.navigateByUrl('');
        location.reload();
    }
    else {
      titleService.setTitle("Detection data");
      this.logCount = new LogCount();
      const self = this;
      this.route.params.subscribe(params => {
            self.userStateService.getUser(params['id']).subscribe(
                user => {
                  this.user = user;
                  titleService.setTitle("Detection data of " + user.firstname + " " + user.lastname);
                }
            );
            self.logService.getStatistics(params['id']).subscribe(
                logCount => {
                  this.logCount = logCount
                },
                () => showSnackMessage(this.snackbar, "Failed to load logs")
            );
          }
      );
    }
  }

  ngOnInit() {
  }
}
