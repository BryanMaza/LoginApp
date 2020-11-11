import { ConnectionService } from './../../services/connection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  identity;
  constructor(private _connectionService: ConnectionService) {}

  ngOnInit(): void {
    this.identity = this._connectionService.getIdentity();
  }


}
