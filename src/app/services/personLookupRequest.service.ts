/**
 * Created by Daryl on 19/04/2017.
 */
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {AuthContext} from "../authentication/auth.context";
import {environment} from "../../environments/environment";
import {User} from "../model/user";
import {UserImage} from "../model/userImage";
import {PersonLookupRequest} from "../model/PersonLookupRequest";


@Injectable()
export class PersonlookupRequestService {
    private static PERSONLOOKUPPATH: string = environment.API_URL + "/api/personLookupRequests";

    constructor(private authContext: AuthContext,private http: Http) {
    }

  /*  postUser(user: User):Observable<User> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(PersonlookupRequestService.PERSONLOOKUPPATH, JSON.stringify(user),{headers:headers})
            .catch(this.extractData);
    }

    // todo: check backend
    updateUser(user: User): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(PersonlookupRequestService.PERSONLOOKUPPATH, JSON.stringify(user),{headers:headers})
            .catch(this.extractData);
    } */

    detectUser(photo: string): Observable<User>{
        let test: UserImage = new UserImage();
        test.imageString = photo;

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(PersonlookupRequestService.PERSONLOOKUPPATH +  "/personLookup?trimJSImageString=" + true,
            JSON.stringify(test),{headers:headers}).map(res => res.json().data.users[0]);
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
