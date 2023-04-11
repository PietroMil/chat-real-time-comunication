import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  errorMessage: string = ""

  constructor(private router: Router, private api: ApiService, private dataService: DataService){}

  public handleClickLogin(email: string){
    this.api.getLogin(email).subscribe({

      next: (data: User) => {
      this.dataService.setUser(data)
      this.router.navigate(['./conversations'])
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.statusText)
        this.errorMessage = 'Error occurred while logging in. Please try again.'
      }

    })
    
  }



}



