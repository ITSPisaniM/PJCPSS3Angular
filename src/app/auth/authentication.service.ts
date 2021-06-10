import { Injectable, Inject } from "@angular/core";

import { from as observableFrom, of as observableOf, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
//import { JwtHelperService } from "@auth0/angular-jwt";
import { ApiService } from "../services/api.service";


export interface Credentials {
  // Customize received credentials here
  // username: string;
  token: string;
}

export interface LoginContext {
  Username: string;
  Password: string;
}

const credentialsKey = "jwt";

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private path: string = "utente";

  public token: boolean = false;

  private _role: string;
  private _username: string;
  private _credentials: string;
  private _features: any = null;

  constructor(private router: Router, public api: ApiService) {//, public jwtHelper: JwtHelperService
    this._credentials = sessionStorage.getItem(credentialsKey);
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<any> {
    let bodyString = JSON.stringify(context); // Stringify payload
    let headers = new Headers({ "Content-Type": "application/json" }); // ... Set content type to JSON
    return this.api.post(this.path+ "/login", context);
  }

  // register(context: any): Observable<any> {
  //   let bodyString = JSON.stringify(context); // Stringify payload
  //   let headers = new Headers({ "Content-Type": "application/json" }); // ... Set content type to JSON
  //   console.log("Body register: ", bodyString);
  //   return this.api.post(this.path + "/register", context);
  // }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return observableOf(true);
  }

  logOut() {
    this.token = false;
    this.router.navigate(["/login"], { replaceUrl: true });
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */

  isAuthenticated(): boolean {
    try {
      if (window.sessionStorage.getItem("jwt")) {
        this.token = true;
      } else {
        this.token = false;
      }
      return this.token;
    } catch (e) {
      return false;
    }
  }

  setAuthenticated(): boolean {
    try {
      this.token = true;
      return this.token;
    } catch (e) {
      return false;
    }
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): string {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   */
  private setCredentials(credentials?: string) {
    this._credentials = credentials || null;

    if (credentials) {
      sessionStorage.setItem(credentialsKey, credentials);
    } else {
      //sessionStorage.removeItem(credentialsKey);
      sessionStorage.removeItem(credentialsKey);
    }
  }

//   get username(): string{
//     return this.jwtHelper.decodeToken(sessionStorage.getItem("jwt"))['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
//   }
  
//   get role(): string{
//     return this.jwtHelper.decodeToken(sessionStorage.getItem("jwt"))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
//   }
}