import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Conversation } from '../models/conversation.model';
import { Chat } from '../models/caht.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getLogin(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/login/${email}`)
  }

  getUserConversation(id: number): Observable<Conversation[]>{

    return this.http.get<Conversation[]>(`${this.baseUrl}/message/${id}`)
  }

  getUserChat(userId: number, conversationId: number): Observable<Chat[]>{
    return this.http.get<Chat[]>(`${this.baseUrl}/chat/${userId}/${conversationId}`)

  }


}
