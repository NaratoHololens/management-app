import { Component, OnInit } from '@angular/core';
import { AuthContext } from '../auth.context';
import {HashService} from '../hash.service';

@Component({
  selector: 'app-auth-response',
  templateUrl: './auth-response.component.html',
  styleUrls: ['./auth-response.component.css']
})
export class AuthResponseComponent implements OnInit {

  authContext: AuthContext;
  hashService: HashService;

  constructor(authContext: AuthContext, hs: HashService) {
    this.authContext = authContext;
    this.hashService = hs;

    //look for a return fragment, which indicates a token
    if (window.location.hash) {
      //reconstitute session information
      let state: string = this.hashService.getValueFromHash('state');
      if (state === sessionStorage['authContext.state']) {
        //extract token information
        let idToken: string = this.hashService.getValueFromHash('id_token');
        sessionStorage["authContext.idToken"] = idToken;
        let accessToken: string = this.hashService.getValueFromHash('access_token');
        sessionStorage["authContext.accessToken"] = accessToken;
      } else {
        console.log("Invalid state received!");
      }
    }
    authContext.validateSession();
  }

  ngOnInit() {
  }

}
