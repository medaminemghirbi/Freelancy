import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  messageError:any
  
  
  registerr:any = "https://imgs.bharatmatrimony.com/bmimgs/login/login-otp-banner.png";
  constructor(private freelancersService:UsersService,private router:Router) { }

  ngOnInit(): void {
  }

  register(f:any){
    let data=f.value
    console.log(data)
    if(data.email.length!==0){
      this.freelancersService.register(data).subscribe(data=>{
        Swal.fire('Whooa!', 'Account succeful created , Acctivate Email to acced account profil!', 'success')
       // this.router.navigate(['/login'])
        
        console.log(data)
      },(err:HttpErrorResponse)=>{
       
  
          console.log(err)
          this.messageError="Email taken"
        
       })
    }else{
      this.messageError="Champs rquired"

    }


  }

}