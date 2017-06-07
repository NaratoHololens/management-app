import {Component, OnInit} from '@angular/core';
import {AuthContext} from "./authentication/auth.context";
import {environment} from "../environments/environment";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Management App';
constructor(public authContext: AuthContext)
{
  const authConfig = environment.authConfig;
  
  this.authContext.initialize(authConfig);
  console.log(authConfig);
  
}


}
