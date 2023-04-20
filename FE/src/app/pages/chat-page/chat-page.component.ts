import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  @ViewChild('chatContainer') element: ElementRef<HTMLElement> | undefined;

  user: User | null = null;
  userChat: Chat[] = [];
  conversationId: string | null = null;

  chatName: string = '';
  subscription$!: Subscription
  constructor(
    private api: ApiService,
    private data: DataService,
    private param: ActivatedRoute,
    private location: Location,
    private _newMessage: NotificationService
  ) {}


  
  ngOnInit(): void {
   
    this.chatName = history.state.data;
    this.conversationId = this.param.snapshot.paramMap.get('conversationId');
    this.user = this.data.getUser();
    this.getChat(this.user!.id, +this.conversationId!);
    
    this.subscription$ = this._newMessage.getMessage().subscribe((data) => {
      this.userChat.push(data)
      setTimeout(() => {
        this.getHeight();
      }, 100);
    })
  }

  



  getChat(id: number, conversationId: number) {
    this.api.getUserChat(id, conversationId).subscribe((data) => {
      this.userChat = data;
      console.log(this.userChat)
      setTimeout(() => {
        this.getHeight();
      }, 100);
    });
  }

  backClick(): void {
    this.location.back();
  }

  getHeight(): void {
    const height = this.element!.nativeElement.scrollHeight;
    console.log(height)
    this.element?.nativeElement.scrollTo({
      left: 0,
      top: height,
      behavior: "smooth",
    });
  }

  onSendClick(text: string): void {
    this.api.postMessage(this.user!.id, +this.conversationId!, text).subscribe(() => {
      this.getChat(this.user!.id, +this.conversationId!)
    })
  }

 

}
