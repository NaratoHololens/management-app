/**
 * Created by Daryl on 19/04/2017.
 */
import {Observable} from "rxjs";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {User} from "../model/user";
import { AuthContext } from '../authentication/auth.context';

@Injectable()
export class UserService {
    private static USERPATH: string = environment.API_URL + "/api/users";

    constructor(private authContext: AuthContext,private http: Http) {
    }

  postUser(user: User):Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(UserService.USERPATH, JSON.stringify(user),{headers:headers})
      .catch(this.extractData);
  }
    getUsers(): Observable<User[]> {
        let headers = new Headers();
        return this.http.get(UserService.USERPATH, this.getOptions())
            .map(res => res.json().data);
    }
    getUser(id: string): Observable<User> {
        let headers = new Headers();
        let options = new RequestOptions({headers: headers});
        return this.http.get(UserService.USERPATH + "/" + id, this.getOptions())
            .map(res => res.json().data);
    }

    updateUser(user: User): Observable<User> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(UserService.USERPATH, JSON.stringify(user),{headers:headers})
            .catch(this.extractData);
    }

  deleteUser(id: string): Observable<any>
  {
    return this.http.delete(UserService.USERPATH + "/" + id, this.getOptions())
      .map(res => res.json()).catch(this.extractData);
  }


  private handleError(error: Response | any) {
        let errMsg: string;
        console.log(error);
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        return res.json();
    }

  private getOptions() {
    let authToken = this.authContext.getAccessToken();
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` });
    return new RequestOptions({ headers: headers });
  }
}
