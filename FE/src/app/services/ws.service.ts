import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

private _webSocket: WebSocket | null = null

    start(id: number)  {
        this._webSocket = new WebSocket(`ws://localhost:6969/${id}`)
        this._webSocket.addEventListener("open", () => {
          console.log("We are connected");
        });
    }
 


}
