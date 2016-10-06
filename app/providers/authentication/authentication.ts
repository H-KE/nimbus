import { Injectable }       from '@angular/core';
import {
    Http,
    Response,
    Headers,
    Request,
    RequestMethod,
    RequestOptions
} from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { Storage, LocalStorage } from 'ionic-angular'

import {
    UserType,
    AuthData,
    Angular2TokenOptions
} from '../../models/authentication';

@Injectable()
export class AuthenticationService {

    get currentUserType(): string {
        if (this._currentUserType != null)
            return this._currentUserType.name;
        else
            return null;
    }

    get currentUserData(): string {
        return this._currentUserData;
    }

    private _options: Angular2TokenOptions;
    private _currentUserType: UserType;
    private _currentAuthData: AuthData;
    private _currentUserData: any;
    private localStorage: any;

  constructor(private http: Http) {
          this.localStorage = new Storage(LocalStorage);
          this.init();
      }

      // Inital configuration
      init(options?: Angular2TokenOptions) {

          let defaultOptions: Angular2TokenOptions = {
              apiPath:                    'http://development-nimbus.cfapps.io/api',
              // apiPath:                    'http://localhost:3000/api',

              signInPath:                 'auth/sign_in',
              signInRedirect:             null,

              signOutPath:                'auth/sign_out',
              validateTokenPath:          'auth/validate_token',

              registerAccountPath:        'auth',
              deleteAccountPath:          'auth',
              registerAccountCallback:    window.location.href,

              updatePasswordPath:         'auth',

              resetPasswordPath:          'auth/password',
              resetPasswordCallback:      window.location.href,

              userTypes:                  null,

              oAuthPaths: {
                  github:                 'auth/github'
              }
          };

          this._options = Object.assign(defaultOptions, options);

          this._tryLoadAuthData();
      }

      // Register request
      registerAccount(firstname: string, lastname: string, email: string, password: string, passwordConfirmation: string, userType?: string): Observable<Response> {

          if (userType == null)
              this._currentUserType = null;
          else
              this._currentUserType = this._getUserTypeByName(userType);

          let body = JSON.stringify({
              first_name: firstname,
              last_name: lastname,
              email: email,
              password: password,
              password_confirmation: passwordConfirmation,
          });

          return this.post(this._constructUserPath() + this._options.registerAccountPath, body);
      }

      // Delete Account
      deleteAccount(): Observable<Response> {
          return this.delete(this._constructUserPath() + this._options.deleteAccountPath);
      }

      // Sign in request and set storage
      signIn(email: string, password: string, userType?: string): Observable<Response> {

          if (userType == null)
              this._currentUserType = null;
          else
              this._currentUserType = this._getUserTypeByName(userType);

          let body = JSON.stringify({
              email: email,
              password: password
          });

          let observ = this.post(this._constructUserPath() + this._options.signInPath, body);

          observ.subscribe(res => this._currentUserData = res.json().data, error => null);

          return observ;
      }

      signInOAuth(oAuthType: string) {

          let oAuthPath: string;

          if (oAuthType == 'github') {
              oAuthPath = this._options.oAuthPaths.github
          }

          window.open(this._constructUserPath() + oAuthPath);
      }

      // Sign out request and delete storage
      signOut(): Observable<Response> {
          let observ = this.delete(this._constructUserPath() + this._options.signOutPath);

          localStorage.clear();
          this._currentAuthData = null;
          this._currentUserType = null;
          this._currentUserData = null;

          return observ;
      }

      // Validate token request
      validateToken(): Observable<Response> {
          let observ = this.get(this._constructUserPath() + this._options.validateTokenPath);

          observ.subscribe(res => this._currentUserData = res.json().data, error => null);

          return observ;
      }

      // Update password request
      updatePassword(password: string, passwordConfirmation: string, currentPassword?: string, userType?: string): Observable<Response> {

          if (userType != null)
              this._currentUserType = this._getUserTypeByName(userType);

          let body: string;

          if (currentPassword == null) {
              body = JSON.stringify({
                  password: password,
                  password_confirmation: passwordConfirmation
              });
          } else {
              body = JSON.stringify({
                  current_password: currentPassword,
                  password: password,
                  password_confirmation: passwordConfirmation
              });
          }

          return this.put(this._constructUserPath() + this._options.updatePasswordPath, body);
      }

      // Reset password request
      resetPassword(email: string, userType?: string): Observable<Response> {

          if (userType == null)
              this._currentUserType = null;
          else
              this._currentUserType = this._getUserTypeByName(userType);

          let body = JSON.stringify({
              email: email,
              redirect_url: this._options.resetPasswordCallback
          });

          return this.post(this._constructUserPath() + this._options.resetPasswordPath, body);
      }

      // Standard HTTP requests
      get(path: string): Observable<Response> {
          return this.sendHttpRequest(new RequestOptions({
              method: RequestMethod.Get,
              url:    this._constructApiPath() + path
          }));
      }

      post(path: string, data: any): Observable<Response> {
          return this.sendHttpRequest(new RequestOptions({
              method: RequestMethod.Post,
              url:    this._constructApiPath() + path,
              body:   data
          }));
      }

      put(path: string, data: any): Observable<Response> {
          return this.sendHttpRequest(new RequestOptions({
              method: RequestMethod.Put,
              url:    this._constructApiPath() + path,
              body:   data
          }));
      }

      delete(path: string): Observable<Response> {
          return this.sendHttpRequest(new RequestOptions({
              method: RequestMethod.Delete,
              url:    this._constructApiPath() + path
          }));
      }

      patch(path: string, data: any): Observable<Response> {
          return this.sendHttpRequest(new RequestOptions({
              method: RequestMethod.Patch,
              url:    this._constructApiPath() + path,
              body:   data
          }));
      }

      head(path: string): Observable<Response> {
          return this.sendHttpRequest(new RequestOptions({
              method: RequestMethod.Head,
              url:    this._constructApiPath() + path
          }));
      }

      options(path: string): Observable<Response> {
          return this.sendHttpRequest(new RequestOptions({
              method: RequestMethod.Options,
              url:    this._constructApiPath() + path
          }));
      }

      // Construct and send Http request
      sendHttpRequest(requestOptions: RequestOptions): Observable<Response> {

          let headers: Headers;
          let baseRequestOptions: RequestOptions;
          let mergedRequestOptions: RequestOptions;

          // Set Headers
          if (this._currentAuthData != null)
              headers = new Headers({
                  'Content-Type': 'application/json', // ToDo: Add to RequestOptions if available
                  'Accept': 'application/json',
                  'Access-Token': this._currentAuthData.accessToken,
                  'Client': this._currentAuthData.client,
                  'Expiry': this._currentAuthData.expiry,
                  'Token-Type': this._currentAuthData.tokenType,
                  'Uid': this._currentAuthData.uid
              });
          else
              headers = new Headers({
                  'Content-Type': 'application/json', // ToDo: Add to RequestOptions if available
                  'Accept': 'application/json'
              });

          // Construct Default Request Options
          baseRequestOptions = new RequestOptions({
              headers: headers
          })

          // Merge standard and custom RequestOptions
          mergedRequestOptions = baseRequestOptions.merge(requestOptions);

          console.log(mergedRequestOptions);

          let response = this.http.request(new Request(mergedRequestOptions)).share();

          this._handleResponse(response);

          return response;
      }

      // Check if response is complete and newer, then update storage
      private _handleResponse(response: Observable<Response>) {
          response.subscribe(res => {
              this._parseAuthHeadersFromResponse(<any>res);
          }, error => {
              this._parseAuthHeadersFromResponse(<any>error);
              console.log('Session Service: Error Fetching Response');
          });
      }

      private _parseAuthHeadersFromResponse(data: any){
          let headers = data.headers;

          console.log(data.headers.get('Access-Token'));

          let authData: AuthData = {
              accessToken:    headers.get('Access-Token'),
              client:         headers.get('Client'),
              expiry:         headers.get('Expiry'),
              tokenType:      headers.get('Token-Type'),
              uid:            headers.get('Uid')
          };

          console.log(authData);

          this._setAuthData(authData);
      }

      // Try to get auth data from storage.
      private _getAuthDataFromStorage() {

          let authData: AuthData = {
              accessToken:    localStorage.getItem('accessToken'),
              client:         localStorage.getItem('client'),
              expiry:         localStorage.getItem('expiry'),
              tokenType:      localStorage.getItem('tokenType'),
              uid:            localStorage.getItem('uid')
          };

          if (this._checkIfComplete(authData))
              this._currentAuthData = authData;
      }

      // Write auth data to storage
      private _setAuthData(authData: AuthData) {

          if (this._checkIfComplete(authData) && this._checkIfNewer(authData)) {

              this._currentAuthData = authData;

              localStorage.setItem('accessToken', authData.accessToken);
              localStorage.setItem('client', authData.client);
              localStorage.setItem('expiry', authData.expiry);
              localStorage.setItem('tokenType', authData.tokenType);
              localStorage.setItem('uid', authData.uid);

              if (this._currentUserType != null)
                  localStorage.setItem('userType', this._currentUserType.name);

          }
      }

      // Check if auth data complete
      private _checkIfComplete(authData: AuthData): boolean {
          if (
              authData.accessToken != null &&
              authData.client != null &&
              authData.expiry != null &&
              authData.tokenType != null &&
              authData.uid != null
          ) {
              return true;
          } else {
              return false;
          }
      }

      // Check if response token is newer
      private _checkIfNewer(authData: AuthData): boolean {
          if (this._currentAuthData != null)
              return authData.expiry >= this._currentAuthData.expiry;
          else
              return true;
      }

      // Try to load user config from storage
      private _tryLoadAuthData() {

          let userType = this._getUserTypeByName(localStorage.getItem('userType'));
          if (userType)
              this._currentUserType = userType;

          this._getAuthDataFromStorage();

          if (this._currentAuthData != null)
              this.validateToken();
      }

      // Match user config by user config name
      private _getUserTypeByName(name: string): UserType {
          if (name == null || this._options.userTypes == null)
              return null;

          return this._options.userTypes.find(
              userType => userType.name === name
          );
      }

      private _constructUserPath(): string {
          if (this._currentUserType == null)
              return '';
          else
              return this._currentUserType.path + '/';
      }

      private _constructApiPath(): string {
          if (this._options.apiPath == null)
              return '';
          else
              return this._options.apiPath + '/';
      }
}
