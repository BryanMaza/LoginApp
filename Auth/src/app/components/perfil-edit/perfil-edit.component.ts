import { global } from './../../services/global';
import { ConnectionService } from './../../services/connection.service';
import { User } from 'src/app/models/user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.css'],
})
export class PerfilEditComponent implements OnInit {
  @Input() edit: boolean;
  @Output() editChange = new EventEmitter<boolean>();
  user: User;
  identity;
  url = global.url;
  constructor(private _connectionService: ConnectionService) {
    this.identity = this._connectionService.getIdentity();

    let { _id, name, bio, phone, email } = this.identity;
    this.user = new User(_id, name, bio, phone, email, '');
  }
  ngOnInit(): void {}
  
  editar() {
    this.edit = false;
    this.editChange.emit(this.edit);
  }

  uploadImage(e) {
    const file = e.target.files.item(0);
    this._connectionService.uploadImage(file).subscribe(
      (res) => {
        this.identity.image = res.image;
        localStorage.setItem('identity', JSON.stringify(this.identity));
        
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submit() {
    this.user.phone=this.user.phone.toString();
    this._connectionService.update(this.user).subscribe(
      (res) => {
        this.identity = res.user;
        localStorage.setItem('identity', JSON.stringify(this.identity));
        this.editar();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
