import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Conversation } from '../models/conversation.model';
import { Chat, Message } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'http://192.168.20.197:3000'

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

  postMessage(userId: number, conversationId: number, text: string): Observable<Message>{
    const body = {text: text} 
    return this.http.post<Message>(`${this.baseUrl}/chat/${userId}/${conversationId}`, body)
  }


}
