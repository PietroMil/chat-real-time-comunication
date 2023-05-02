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

 
 
  message: string = '';
  initials: string = '';
 


  constructor(private router: Router) {}

  ngOnInit(): void {
    

    //take only hour
 
    

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
