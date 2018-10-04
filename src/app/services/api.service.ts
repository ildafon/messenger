import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from './../models/user.model';
import { Message } from './../models/message.model';

@Injectable()
export class ApiService {

  constructor(private http: Http) {}

  public getUserList(): Observable<string[]> {
    return this.http.get('/assets/user-list.json')
                        .map((res: Response) => res.json())
                        .catch(this.handleError );
  }

  public getUserDetail(id: string): Observable<User> {
    return this.http.get(`/assets/user${id}.json`)
                        .map((res: Response) => res.json())
                        .catch(this.handleError );
  }

  public getConversationList(): Observable<string[]> {
    return this.http.get(`/assets/conversation-list.json`)
                        .map((res: Response) => res.json())
                        .catch(this.handleError );
  }

  public getMessages(): Observable<Message[]> {
    return this.http.get(`/assets/messages.json`)
                        .map((res: Response) => res.json())
                        .catch(this.handleError );
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
