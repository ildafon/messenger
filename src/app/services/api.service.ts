


import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserListItem } from './../models/user-list.model';
import { UserDetail } from './../models/user-detail.model';
import { Conversation } from '../models/conversation';
import { Message } from './../models/message';

@Injectable()
export class ApiService {

  constructor(private http: Http) {}

  public getUserList(): Observable<UserListItem[]> {
    return this.http.get('/assets/user-list.json')
                        .map((res: Response) => res.json())
                        .catch(this.handleError );
  }

  public getUserDetail(id: string): Observable<UserDetail> {
    return this.http.get(`/assets/user${id}.json`)
                        .map((res: Response) => res.json())
                        .catch(this.handleError );
  }

  public getConversationList(): Observable<Conversation[]> {
    return this.http.get(`/assets/conversation-list.json`)
                        .map((res: Response) => res.json())
                        .catch(this.handleError );
  }

  public getConversationHistory(id: string): Observable<Message[]> {
    return this.http.get(`/assets/conversation${id}.json`)
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
