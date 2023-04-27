import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent {

  users: User[] = []
  loggedUser: User | null = null;


  constructor(private api: ApiService, private data: DataService, private router: Router ){}

  backClick(): void {
    this.router.navigate(['./conversations']);
  }


  handleOnClick(userId: number, userName: string) {  
    this.router.navigate([`./chat/${userId}`], { state: {data: userName}});
  }

  ngOnInit() {
    this.loggedUser = this.data.getUser();

    this.api.getAllUsers().subscribe((data) => {
      
      //take all the users expect logged user
      const filteredData = data.filter(item => item.email !== this.loggedUser?.email)
  
      this.users = filteredData
  
    })

  }

}
