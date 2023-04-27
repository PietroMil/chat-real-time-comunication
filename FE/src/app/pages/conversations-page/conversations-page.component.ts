import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Conversation } from '../../models/conversation.model';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversations-page',
  templateUrl: './conversations-page.component.html',
  styleUrls: ['./conversations-page.component.scss'],
})
export class ConversationsPageComponent implements OnInit {
  userConversation: Conversation[] = [];
  user: User | null = null;
  constructor(private api: ApiService, private data: DataService, private router: Router) {}

  public handleUserCoversation(id: number) {
    this.api.getUserConversation(id).subscribe((data) => {
      this.userConversation = data;
    });
  }

  ngOnInit() {
    
    this.user = this.data.getUser();
    this.handleUserCoversation(this.user!.id);
  }

  handleOnClick() {  
   
    this.router.navigate([`/contacts`]);
  }
}
