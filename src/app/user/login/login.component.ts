import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerr:any = "https://imgs.bharatmatrimony.com/bmimgs/login/login-otp-banner.png";

  public connecte : boolean = false ;

  messageError:any

  registerForm =  new FormGroup({
    email:new FormControl(),
    password:new FormControl()
  })

  user : User ={
    email:'',
    password:'',
  }

  constructor(private UsersSErvice:UsersService,private route:Router) { }

  ngOnInit(): void {
  }

  login(){

    const data = {
      email:this.user.email,
      password:this.user.password,

    };
    debugger
    this.UsersSErvice.login(data).subscribe(
      response => {
        console.log(response);
        if(response.status==401){
     
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User Not Found Or invalide Credentialns'
          })
        }else{


       if(response.user.email_confirmed==true) {
        if(response.logged_in ==true && response.role =="admin"  ){ 
          sessionStorage.setItem( 'admindata', JSON.stringify( response.user ) );
          sessionStorage.setItem( 'logged_in', JSON.stringify( response.logged_in ) );
          sessionStorage.setItem( 'role', JSON.stringify( response.role ) );
          console.log(response);
          this.route.navigate(['/dashboard-admin']);
        }
        else if(response.logged_in ==true && response.role =="client")
        {
          sessionStorage.setItem( 'clientdata', JSON.stringify( response.user ) );
          sessionStorage.setItem( 'logged_in', JSON.stringify( response.logged_in ) );
          sessionStorage.setItem( 'role', JSON.stringify( response.role ) );
          this.route.navigate(['/dashbord-client']);
        }else if(response.logged_in ==true && response.role =="freelancer")
        {
          sessionStorage.setItem( 'freelancerdata', JSON.stringify( response.user ) );
          sessionStorage.setItem( 'logged_in', JSON.stringify( response.logged_in ) );
          sessionStorage.setItem( 'role', JSON.stringify( response.role ) );
          this.route.navigate(['/dashboard-freelancer']);
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email or Password is Incorrect!'
          })
        }
       }else{
     
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'account created but not confirmed!, check Your EMail'
          })
        }
       
      }
     
      },(err:HttpErrorResponse)=>this.messageError=err.error.error);
      
  }

  
}