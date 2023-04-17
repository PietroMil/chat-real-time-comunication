import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Conversation } from '../../models/conversation.model';

@Component({
  selector: 'app-conversations-page',
  templateUrl: './conversations-page.component.html',
  styleUrls: ['./conversations-page.component.scss']
})
export class ConversationsPageComponent implements OnInit {

userConversation: Conversation[] = []

constructor(private api: ApiService){}

public handleUserCoversation(id: string) {
  this.api.getUserConversation(id).subscribe((data) => {
   this.userConversation = data
  })
}

ngOnInit(){
  this.handleUserCoversation('1')
}

}
