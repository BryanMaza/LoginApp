import { Router } from '@angular/router';
import { ConnectionService } from './../../services/connection.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User;
  msg_register=true;
  constructor(
    private _conectionService:ConnectionService,
    private _router:Router
  ) { 
    this.user= new User('','','','','','');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    
    this._conectionService.register(this.user).subscribe(
      res=>{
        this._router.navigate(['/login']);
        
      },
      err=>{
        console.log(err);
        
      }
    )
    
  }
}
