import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  logo:any = "./assets/lg.png";
  resetemaillink! :  FormGroup;
  messageSuccess = '' ;
  messageErr =''
  constructor(private usersService:UsersService,private route:Router) {
    this.resetemaillink = new FormGroup({
      email: new FormControl('', [Validators.required])

    });
   }

  ngOnInit(): void {
  }
  sendresetlinkk (f:any)
  {

    const formData = new FormData();
    formData.append('email', this.resetemaillink.value.email);
    let data=f.value
     
    this.usersService.sendresetlink(formData).subscribe( ()=>{
      
    
     // console.log(formData)
     
      Swal.fire('REset Link Sent Avec Succes!', '', 'success')


  },(err:HttpErrorResponse)=>{
    this.messageErr=err.error
    console.log(err.error)
     console.log(err.status)
     
  }) ;
  }
}
