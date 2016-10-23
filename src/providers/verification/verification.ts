import { Injectable } from '@angular/core';
import { Http,
         Response,
         Headers,
         Request,
         RequestMethod,
         RequestOptions }   from '@angular/http';
import { Observable } from "node_modules/rxjs/Observable";
import { AuthenticationService } from '../../providers/authentication/authentication';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class VerificationService {
  hostUrl: any;

  constructor(public http: Http,
              public auth: AuthenticationService) {
    this.hostUrl = 'https://s3.amazonaws.com/verification.nimbus.co/';
  }

  saveDocument(email, file, type): Observable {
    var filePath = email +  '/' + type;
    var data = {
      verification_type: type,
      verification_url: this.hostUrl + filePath
    }
    let body = JSON.stringify(data)

    return this.postImageToS3(file, filePath)
      .flatMap((x) => this.auth.post('verification_documents', body)
          .map( (responseData) => {
            return responseData.json();
          })
      )
  }

  postImageToS3(file, path): Oberservable {

    let formData: FormData = new FormData();

    //Build AWS S3 Request
    formData.append('key', path);
    formData.append('Content-Type','image/jpeg');
    //Put in your access key here
    formData.append('file',file);

    var requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.hostUrl,
      body: formData
    })

    return this.http.request(new Request(requestOptions));
  }
}
