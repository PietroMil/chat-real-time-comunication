import { Component, Input, OnInit } from '@angular/core';
import { Conversation } from '../models/conversation.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'conversations-row',
  templateUrl: './conversations-row.component.html',
  styleUrls: ['./conversations-row.component.scss'],
})
export class ConversationsRow implements OnInit {
  @Input()
  conversationDetail!: Conversation;
  

  dateObject: Date = new Date();
  message: string = '';
  initials: string = '';
  messageCounter: number = 0;


  subscription$!: Subscription


  constructor(private router: Router, private _newMessage: NotificationService) {}

  ngOnInit(): void {
    
    this.subscription$ = this._newMessage.getMessage().subscribe((data) => {
    
      if(this.conversationDetail.userId === data.userId) {
        this.conversationDetail.message = data.message
        this.messageCounter++
      } 
      

    
    })



    //take only hour
    const dateString = this.conversationDetail.date;
    
    this.dateObject = new Date(dateString);

    //split name initials
    this.initials = this.conversationDetail.fullName
      .split(' ')
      .map((w) => w.charAt(0))
      .join('');
  }

  handleOnClick() {  
    this.router.navigate([`./chat/${this.conversationDetail.userId}`], { state: {data: this.conversationDetail.fullName}});
  }
}
