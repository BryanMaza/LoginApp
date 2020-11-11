import { Router } from '@angular/router';
import { ConnectionService } from './../../services/connection.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: '../register/register.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;
  msg_register=false;
  identity;
  token;
  constructor(
    private _connectionService:ConnectionService,
    private _router:Router
  ) { 
    this.user= new User('','','','','','');
  }

  ngOnInit(): void {
  }
  onSubmit(form){
    this._connectionService.login(this.user,true).subscribe(
      res=> {
        this.identity=res.data.user;
        this.token=res.data.token;
        
        // Mantenemos los datos para la sesion
        localStorage.setItem('identity',JSON.stringify(this.identity));
        localStorage.setItem('token',this.token);
        
        this._router.navigate(['/perfil']);
      },
      err=>{
        console.log(err);
        
      }
    );
  }

}
