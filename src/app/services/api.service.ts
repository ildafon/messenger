import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { User } from './../models/user.model';
import { Message } from './../models/message.model';

import { environment } from './../../environments/environment';


@Injectable()
export class ApiService {
  apiUrl = environment.apiUrl;

  constructor(private http: Http) { }

  fetchUsers(): Observable<User[]> {
    return this.http.get(`${this.apiUrl}github-users.json`)
    .map(res => res.json() || []);
  }


  retrieveUser(id: string): Observable<User> {
    return this.http.get(`${this.apiUrl}user-${id}.json`)
    .map(res => res.json());
  }

  fetchMessages(): Observable<Message[]> {
    return this.http.get(`${this.apiUrl}messages.json`)
    .map(res => res.json() || []);
  }
}
