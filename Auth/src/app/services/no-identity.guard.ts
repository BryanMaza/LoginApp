import { ConnectionService } from './connection.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
 

@Injectable({
  providedIn: 'root'
})
export class NoIdentityGuard implements CanActivate {
  
  constructor(
    private _connectionService:ConnectionService,
    private _router:Router
  ){

  }
  canActivate() {

    let identity=this._connectionService.getIdentity();
    if(identity && identity.email){
      this._router.navigate(['/perfil']);
      return false
    }
  
    return true;
  }
  
}
