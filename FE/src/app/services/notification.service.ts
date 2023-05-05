import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
private _newMessage = new Subject<Notification>()


constructor() {}

getMessage(): Observable<Notification> {
  return this._newMessage.asObservable()
}

setMessage(data: Notification) {
  return this._newMessage.next(data)
}

}