import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage, LocalStorage } from 'ionic-angular'
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  isLoggedIn: boolean;
  localStorage: any;

  constructor(private http: Http) {
          this.isLoggedIn = false;
          this.localStorage = new Storage(LocalStorage);
      }

      login(user) {
        var headers = new Headers();
        var credentials = "email=" + user.email + "&password=" + user.password;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {

          this.http.post('http://localhost:3000/api/auth/sign_in', credentials, {headers: headers})
              .map(response => response.json())
              .subscribe(
                data => {
                  console.log(data);
                  // this.localStorage.set(t)
                  this.isLoggedIn = true;
                  resolve(this.isLoggedIn);
                },
                error => {
                  resolve(error._body);
                }
              )
        });


      }
      register(user) {

        return new Promise(resolve => {
          var credentials = "email=" + user.email +
                            "&password=" + user.password +
                            "&password_confirmation=" + user.password;
                            //  +
                            // "firstName=" + user.firstName +
                            // "lastName=" + user.lastName;

          var headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          this.http.post('http://localhost:3000/api/auth/', credentials, {headers: headers})
            .map(response => response.json())
            .subscribe(
              data => {
                console.log(data);
                resolve(true);
              },
              error => {
                console.log(error)
              }
            )
        });

      }

      logout() {
          this.isLoggedIn = false;
          this.localStorage.clear();
      }
  }
