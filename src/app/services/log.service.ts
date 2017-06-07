import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import {AuthContext} from "../authentication/auth.context";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Rx";
import {LogCount} from "../model/logCount";
/**
 * Created by nadya on 8/05/2017.
 */

@Injectable()
export class LogService {
  private static LOGPATH:string = environment.API_URL + "/api/logs";//todo add 's'

  constructor(private http:Http)
  {
  }

  getStatistics(userid: string): Observable<LogCount> {
    let headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.http.get(LogService.LOGPATH + "/" + userid + "/stats", options)
      .map(res => res.json().data);
  }
}

