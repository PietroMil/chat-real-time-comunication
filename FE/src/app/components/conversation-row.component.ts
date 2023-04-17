import { Component, Input, OnInit, Output } from '@angular/core';
import { Conversation } from '../models/conversation.model';
import { Router } from '@angular/router';


@Component({
  selector: 'conversations-row',
  templateUrl: './conversations-row.component.html',
  styleUrls: ['./conversations-row.component.scss']
})
export class ConversationsRow implements OnInit {
@Input()
conversationDetail!: Conversation
@Output()
conversationID!: string

dateObject: Date= new Date
message: string = ''
initials: string = '' 
constructor(private router: Router){}



ngOnInit(): void {
  console.log(new Date())
  console.log(this.conversationDetail.date)
  //take only hour
    const dateString = this.conversationDetail.date
   this.dateObject = new Date(dateString)

   //split name initials
  this.initials = this.conversationDetail.fullName.split(' ').map(w => w.charAt(0)).join('')

  

}

handleOnClick() {
  this.router.navigate(['./chat'])
}



}