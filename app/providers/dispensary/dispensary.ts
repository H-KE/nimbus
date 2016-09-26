import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DispensaryService {

  constructor(private http: Http) {
      }

      getDispensaries(distribution) {
        var headers = new Headers();
        var params = "distribution=" + distribution;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {

          this.http.get('http://localhost:3000/api/retailers', {headers: headers})
              .map(response => response.json())
              .subscribe(
                data => {
                  console.log(data);
                  resolve(data);
                },
                error => {
                  console.log(error);
                  resolve(error);
                }
              )
        });


      }
      getDispensary(id) {

        return new Promise(resolve => {
          var headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          this.http.post('http://localhost:3000/api/auth/' + id, {headers: headers})
            .map(response => response.json())
            .subscribe(
              data => {
                console.log(data);
              },
              error => {
                console.log(error)
              }
            )
        });

      }
}
