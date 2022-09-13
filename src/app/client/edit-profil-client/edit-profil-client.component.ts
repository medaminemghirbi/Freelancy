import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profil-client',
  templateUrl: './edit-profil-client.component.html',
  styleUrls: ['./edit-profil-client.component.css']
})
export class EditProfilClientComponent implements OnInit {
  messageErr:any;
  clientdata:any;
  admindata:any;
  upadate!: any;
  imageupdate!:any;
  image:any;
  messageSuccess: any;

  constructor(private route:Router, private usersService:UsersService) {
    this.clientdata = JSON.parse( sessionStorage.getItem('clientdata') !);
    console.log(this.clientdata)
    this.imageupdate = new FormGroup({ avatar: new FormControl('', [Validators.required]), });
    this.upadate = new FormGroup({
     // avatar: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      job: new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),

      password: new FormControl('', [Validators.required]),
    //  password_confirmation: new FormControl('', [Validators.required]),
    });
  }
  
  getdata(email:string , id:any){
    this.messageSuccess=''
    this.clientdata.id = id 
    this.clientdata.email = email
    console.log(this.clientdata)

  }

  fileChange(event:any) {
    this.image =event.target.files[0];   
  }
 /* updateimage (f:any){
    let data=f.value
    const formData = new FormData();
   formData.append('avatar', this.image );

   this.usersService.updateimagefreelancer(this.freelancerdata.id,formData).subscribe(response=>
    {
      debugger
      localStorage.clear();
      localStorage.setItem( 'freelancerdata', JSON.stringify( response ) );
      window.location.reload();
   
    console.log(response)
      let indexId=this.freelancerdata.findIndex((obj:any)=>obj.id==this.freelancerdata.id)

      this.freelancerdata[indexId].user_image_url=data.user_image_url


      this.messageSuccess=`this email : ${this.freelancerdata[indexId].email} is updated`

    },(err:HttpErrorResponse)=>{
      console.log(err.message)
    
    })
    
  }*/
  updateimage(f:any){
    let data=f.value
    const imageformadata = new FormData();
    imageformadata.append('avatar', this.image );
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this.usersService.updateimageuser(this.clientdata.id,imageformadata).subscribe(response=>
          {
            
            
            sessionStorage.setItem( 'clientdata', JSON.stringify( response ) );
            window.location.reload();
         
    
          },(err:HttpErrorResponse)=>{
            console.log(err.message)
          
          })
    //   this.route.navigate(['/dashbord-freelancer']);
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
  }
  updatenewuser (f:any){
    let data=f.value
    const formData = new FormData();
    //formData.append('avatar', this.image );
    formData.append('firstname', this.upadate.value.firstname);
    formData.append('lastname', this.upadate.value.lastname);
    formData.append('email', this.upadate.value.email);
    formData.append('adresse', this.upadate.value.adresse);
    formData.append('phone', this.upadate.value.phone);
    formData.append('job', this.upadate.value.job);
    formData.append('description', this.upadate.value.description);
    formData.append('birthday', this.upadate.value.birthday);

    formData.append('password', this.upadate.value.password);
  // formData.append('password_confirmation', this.upadate.value.password_confirmation);
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.usersService.updateprofilclient(this.clientdata.id,formData).subscribe(response=>
          {
           
            sessionStorage.setItem( 'clientdata', JSON.stringify( response ) );
            window.location.reload();
         
          console.log(response)
            let indexId=this.clientdata.findIndex((obj:any)=>obj.id==this.clientdata.id)
    
            this.clientdata[indexId].email=data.email
            this.clientdata[indexId].user_image_url=data.user_image_url
            this.clientdata[indexId].firstname=data.firstname
            this.clientdata[indexId].lastname=data.lastname
            this.clientdata[indexId].adresse=data.adresse
            this.clientdata[indexId].phone=data.phone
            this.clientdata[indexId].job=data.job
            this.clientdata[indexId].description=data.description
            this.clientdata[indexId].birthday=data.birthday
    
            this.clientdata[indexId].password=data.password
            this.clientdata[indexId].password_confirmation=data.password_confirmation
    
            this.messageSuccess=`this email : ${this.clientdata[indexId].email} is updated`
    
          },(err:HttpErrorResponse)=>{
            console.log(err.message)
          
          })
        this.route.navigate(['/dashbord-client']);
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
  }

  
  ngOnInit(): void {
  }


}