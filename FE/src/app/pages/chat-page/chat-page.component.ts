import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/models/caht.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Location } from '@angular/common';

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

  constructor(
    private api: ApiService,
    private data: DataService,
    private param: ActivatedRoute,
    private location: Location
  ) {}

  handleChat(id: number, conversationId: number) {
    this.api.getUserChat(id, conversationId).subscribe((data) => {
      this.userChat = data;

      setTimeout(() => {
        this.getHeight();
      }, 100);
    });
  }

  backClick(): void {
    this.location.back();
  }

  getHeight(): void {
    const height = this.element!.nativeElement.clientHeight;
    this.element?.nativeElement.scrollTo( {
      left: 0,
      top: height,
      behavior: "smooth",
    });
  }

 

  ngOnInit(): void {
    this.chatName = history.state.data;
    this.conversationId = this.param.snapshot.paramMap.get('conversationId');
    this.user = this.data.getUser();
    this.handleChat(this.user!.id, +this.conversationId!);
  }
}
