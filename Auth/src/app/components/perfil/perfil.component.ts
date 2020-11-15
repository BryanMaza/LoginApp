import { Router } from '@angular/router';
import { global } from './../../services/global';
import { ConnectionService } from './../../services/connection.service';
import { Component, OnInit,DoCheck } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit, DoCheck {
  identity;
  edit=false;
  url=global.url;
  constructor(
    private _connectionService: ConnectionService,
    private _router:Router
    ) {}
  
  ngOnInit(): void {
     
    this.identity = this._connectionService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this._connectionService.getIdentity();
  }

  editar(){
   this.edit=true;  
  }
  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this._router.navigate(['/login']);
  }

}
