import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {showSnackMessage} from "../../util/index";
import {UserStateService} from "../../services/users-state.service";
import {User} from "../../model/user";

@Component({
  selector: 'user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() currentUsers: User[];
  @Output() deleteUserEvent: EventEmitter<User> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }


  deleteUser(user: User){
    this.deleteUserEvent.emit(user);
  }

  goModifyUser(user: User){
    this.router.navigateByUrl('/goModifyUser/' + user.id);
  }

  goAddUser(){
    this.router.navigateByUrl('/createUser');
  }
  
  goUserDetail(user: User){
    this.router.navigateByUrl('/user/' + user.id);
  }

  goUserStatistics(user: User){
    this.router.navigateByUrl('/statistics/' + user.id);
  }
}
