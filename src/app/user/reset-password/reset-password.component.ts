import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetpassword! :  FormGroup;
  messageSuccess = '' ;
  messageErr =''
  constructor(private usersService:UsersService, public activatedRoute: ActivatedRoute,private route:Router) {
    this.resetpassword = new FormGroup({
      password: new FormControl('', [Validators.required])

    });
   }

  ngOnInit(): void {
  }
  updatepassword (f:any)
  {

    const formData = new FormData();
    formData.append('password', this.resetpassword.value.password);
    let data=f.value

     
    this.usersService.resetpassword(this.activatedRoute.snapshot.params['token'],formData).subscribe( ()=>{
      console.log(formData)
    
     // console.log(formData)
     



  },(err:HttpErrorResponse)=>{
    this.messageErr=err.error
    console.log(err.error)
     console.log(err.status)
     
  }) ;
  Swal.fire('Password Updated Avec Succes !', '', 'success')
  this.route.navigate(['/login']);
  }
}
