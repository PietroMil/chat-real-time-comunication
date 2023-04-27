import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

private _webSocket: WebSocket | null = null

constructor(private _newMessage: NotificationService){}

    start(id: number)  {
        this._webSocket = new WebSocket(`ws://192.168.2.134:6969/${id}`)
        this._webSocket.addEventListener("open", () => {
          console.log("We are connected");

        });
        this._webSocket.addEventListener("message", (event) => {
          this._newMessage.setMessage(JSON.parse(event.data))
        });
    }
}
