import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Conversation } from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLogin(email: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/login/${email}`)
  }

  getUserConversation(id: string): Observable<Conversation[]>{

    return this.http.get<Conversation[]>(`http://localhost:3000/message/${id}`)
  }


}
