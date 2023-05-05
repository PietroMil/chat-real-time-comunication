import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Conversation } from '../../models/conversation.model';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-conversations-page',
  templateUrl: './conversations-page.component.html',
  styleUrls: ['./conversations-page.component.scss'],
})
export class ConversationsPageComponent implements OnInit {
  userConversation: Conversation[] = [];
  user: User | null = null;
  subscription$!: Subscription;

  constructor(
    private api: ApiService,
    private data: DataService,
    private router: Router,
    private _newMessage: NotificationService
  ) {}

  public handleUserCoversation(id: number) {
    this.api.getUserConversation(id).subscribe((data) => {
      data.forEach(element => {
      
        element.date = new Date(element.date);
        element.messageCounter = 0
      });
      this.userConversation = data;
      console.log(this.userConversation)

    });
  }

  ngOnInit() {
   
    this.user = this.data.getUser();
    this.handleUserCoversation(this.user!.id);
   
    this.subscription$ = this._newMessage.getMessage().subscribe((data) => {
      this.userConversation.forEach((element) => {
        
        if (element.userId === data.userId) {
         
          element.message = data.message;
        
          element.date = new Date()
          
          element.messageCounter++
          console.log(this.userConversation)
        }
      });
    });
  }

  handleOnClick() {
    this.router.navigate([`/contacts`]);
  }
}
