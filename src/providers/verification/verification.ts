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

  saveDocument(type, filePath): any {
    var data = {
      verification_type: type,
      verification_url: this.hostUrl + filePath
    };
    let body = JSON.stringify(data);

    return this.auth.post('verification_documents', body);
  }

  postImageToS3(file, path): any {

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

  deleteDocument(id): any {
    return this.auth.delete('verification_documents/'+id);
  }
}
