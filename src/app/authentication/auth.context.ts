import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'
import { HashService } from './hash.service';
import 'rxjs/add/operator/toPromise';
import 'jsrsasign';

var jsr = require('jsrsasign');

@Injectable()
export class AuthContext {

  public config: AuthConfig;
  public isInitialized: boolean = false;
  public state: string;

  public fullName: string;
  public sessionValidated: boolean = false;
  public claims: TokenClaims;
  public idToken: string = "";

  httpService: Http;
  hashService: HashService;
  key: string;

  constructor(http: Http, hs: HashService) {

    this.httpService = http;
    this.hashService = hs;

    //bij creatie van authcontext wordt gekeken of appId, tenantId,.. al gekend zijn
    //maw opgeslagen in de sessionStorage
    if (sessionStorage["authContext.config"]) {
      this.state = sessionStorage["authContext.state"];
      this.initialize(JSON.parse(sessionStorage["authContext.config"]));
    }

  }


  public initialize(authConfig: AuthConfig): void
  {
    this.config = authConfig;
    sessionStorage["authContext.config"] = JSON.stringify(this.config);

    this.isInitialized = true;
    this.validateSession();
  }

//als er al een token aanwezig is wordt deze gevalideerd
  public validateSession(): void {
    if (sessionStorage["authContext.idToken"])
    {
      let token: string = sessionStorage["authContext.idToken"];
      let tokenHeader: TokenHeader = jsr.KJUR.jws.JWS.readSafeJSONString(jsr.b64utos(token.split('.')[0]));
      let tokenClaims: TokenClaims = jsr.KJUR.jws.JWS.readSafeJSONString(jsr.b64utos(token.split('.')[1]));
      let tokenSignature: string = token.split('.')[2];

      this.idToken = token;
      this.claims = tokenClaims;

      //get profile information from token
      console.log("claims:", tokenClaims);
      this.fullName = tokenClaims.name;

      //validate token
      if (this.validateToken(this.config.tenantId, this.config.applicationId, token, tokenHeader, tokenClaims)) {
        console.info('token validated!');
        this.sessionValidated = true;
      } else {
        console.info('invalid token!');
      }
    }
    if (sessionStorage['authContext.target']) {
      let target = sessionStorage["authContext.target"];
      sessionStorage["authContext.target"] = "";
      window.location.href = target;
    }
  }

  private validateToken(tenantId: string, clientId: string, token: string, tokenHeader: TokenHeader, tokenClaims: TokenClaims): boolean {

    //validate issuer
    if (tokenClaims.iss !== "https://sts.windows.net/" + tenantId + "/") {
      console.error(`invalid issuer: ${tokenClaims.iss}`);
      return false;
    }

    //validate audience
    if (tokenClaims.aud !== clientId) {
      console.error(`invalid audience: ${tokenClaims.aud}`);
      return false;
    }

    return true;

  };

  //on click login button roept deze methode op
  public logIn(): void {
    if (!this.isInitialized) {
      console.log("authContext is not initialized.");
      return;
    }
    //create a new session
    this.state = this.createNonce();
    sessionStorage["authContext.state"] = this.state;
    sessionStorage["authContext.target"] = "https://" + location.host + "/users";  //is link of the current page

    window.location.href = this.getSignInEndpoint();
  }

  private getSignInEndpoint(): string {
    let endpoint =
      "https://login.microsoftonline.com/" + this.config.tenantId + "/oauth2/authorize?" +
      "response_type=id_token+token&" +
      "response_mode=fragment&" +
      "client_id=" + this.config.applicationId + "&" +
      "redirect_uri=" + this.config.logonRedirectUri + "&" +
      "scope=openid&" +
      "state=" + this.state + "&" +
      "nonce=" + this.state + "&" +
      "resource=" + this.config.resourceId;
    console.log(endpoint);
    return endpoint;
  }

  public logOut(): void {
    if (!this.isInitialized) {
      console.log("authContext is not initialized.");
      return;
    }
    this.clear();
    sessionStorage["authContext.target"] = window.location.origin;
    window.location.href = this.getLogOutEndpoint();
  }

  private getLogOutEndpoint(): string {
    let endpoint =
      "https://login.microsoftonline.com/" + this.config.tenantId + "/oauth2/logout?" +
      "post_logout_redirect_uri=" + this.config.logoutRedirectUri;
    console.log(endpoint);
    return endpoint;
  }

  private clear() {
    this.state = undefined;
    this.sessionValidated = false;
    this.claims = undefined;
    sessionStorage["authContext.idToken"] = "";
    sessionStorage["authContext.accessToken"] = "";
    sessionStorage["authContext.state"] = "";
  }

  /* nonce means ‘number used once’ and is a unique and usually random string that is meant to uniquely identify each signed request.
  By having a unique identifier for each request, the Service Provider is able to prevent requests from being used more than once. */
  private createNonce(): string {
    let nonce = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      nonce += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return nonce;
  }

  public getAccessToken(): string {
    if (sessionStorage["authContext.accessToken"] != null) {
      return sessionStorage["authContext.accessToken"];
    }
    return "";
  }

  public isAuthenticated(): boolean {
    return this.sessionValidated && sessionStorage['authContext.accessToken'] !== '';
  }

}

export class AuthConfig {
  public applicationId: string;
  public tenantId: string;
  public logonRedirectUri: string;
  public logoutRedirectUri: string;
  public resourceId: string;
}


