import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthenticationService } from '../authentication/authentication'
import 'rxjs/add/operator/map';

@Injectable()
export class DispensaryService {

  constructor(private http: Http, private auth: AuthenticationService) {
      }

      getDispensaries(distribution) {
        var params = "?distribution=" + distribution;

        return new Promise(resolve => {
          this.auth.get('retailers/channel' + params)
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
          this.auth.get('retailers/' + id)
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

      getDispensaryMenu(id) {
        
        return new Promise(resolve => {
          this.auth.get('retailers/' + id + '/products')
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
}
