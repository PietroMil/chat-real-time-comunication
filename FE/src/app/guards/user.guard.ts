import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard  {
  
  constructor(private dataService: DataService, private route: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
 
    if(this.dataService.getUser()){
    return true
  }
  this.route.navigate(['./'])
  return false
  }
 
}
