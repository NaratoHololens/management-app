import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {UserService} from "./user.service";
import {PersonlookupRequestService} from "./personLookupRequest.service";
import {User} from "../model/user";

/**
 * Created by Daryl on 20/05/2017.
 */

@Injectable()
export class UserStateService {
    private userList: User[] = [];

    constructor(private userService: UserService, private discoService: PersonlookupRequestService) {
    }

    public getUsers(): Observable<User[]>{
        if(this.userList == null || this.userList.length <= 1){
            return this.userService.getUsers().map(
                users => this.userList = users
            );
        }
        return Observable.of(this.userList);
    }

    public getUser(id: string): Observable<User>{
        let userResult = this.userList.filter(user => user.id == id);
        if(userResult.length != 0 && userResult != null){
            return Observable.of(userResult[0]);
        }
        return this.userService.getUser(id);
    }

    public saveUser(user: User): Observable<User>{
        return this.userService.postUser(user).map(() => this.userList[this.userList.length] = user);
    }

    public updateUser(user: User): Observable<User>
    {
      return this.userService.updateUser(user).map(u => this.updateSucces(u));
       /* if(user.photoString == "" || user.photoString == null){
            return this.userService.updateUser(user).map(u => this.updateSucces(u));
        }
        else{
            return this.discoService.updateUser(user).map(u => this.updateSucces(u));
        } */
    }

    private updateSucces(user: User): User{
        if(this.userList.length != 0){
            this.userList.filter(u => u.id == user.id)[0] = user;
        }
        return user;
    }

    public deleteUser(user: User): Observable<any>{
        return this.userService.deleteUser(user.id).map(
            () => {
                if(this.userList.length != 0){
                    let userIndex = this.userList.indexOf(user);
                    this.userList.splice(userIndex, 1);
                }
            }
        );
    }
}
