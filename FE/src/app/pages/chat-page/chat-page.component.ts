import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
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
  currentDate!: Date;
 

  chatName: string = '';
  subscription$!: Subscription
  constructor(
    private api: ApiService,
    private data: DataService,
    private param: ActivatedRoute,
    private router: Router,
    private _newMessage: NotificationService
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date()
   
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

  isDateBeforeToday(date: Date): boolean {
    // Convert date string to Date object
    const chatDate = new Date(date);
    //set today start from midnight
    this.currentDate.setHours(0, 0, 0, 0)

    // Compare chat date with current date
    return chatDate < this.currentDate;
    }


  getChat(id: number, conversationId: number) {
    this.api.getUserChat(id, conversationId).subscribe((data) => {
     
      this.userChat = data;
     
      setTimeout(() => {
        this.getHeight();
      }, 100);
    });
  }

  backClick(): void {
    this.router.navigate(['./conversations']);
  }

  getHeight(): void {
    const height = this.element!.nativeElement.scrollHeight;
    this.element?.nativeElement.scrollTo({
      left: 0,
      top: height,
      behavior: "smooth",
    });
  }

  onSendClick(text: string ) {
    this.api.postMessage(this.user!.id, +this.conversationId!, text).subscribe(() => {
      this.getChat(this.user!.id, +this.conversationId!)
      
    })
  }
}
