
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

private _user: User | null = null

constructor() { }

getUser(): User|null{
  return this._user
}

setUser(user: User): void{
  this._user = user
}
  

}