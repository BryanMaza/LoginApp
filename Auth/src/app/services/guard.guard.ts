import { ConnectionService } from './connection.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(
    private _connectionService: ConnectionService,
    private _router: Router
  ) {}

  canActivate() {
    let identity = this._connectionService.getIdentity();

    if (identity && identity.email) {
      return true;
    }
    this._router.navigate(['/']);
    return false;
  }
}
