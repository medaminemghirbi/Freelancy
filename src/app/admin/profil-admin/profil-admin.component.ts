import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent implements OnInit {

  messageErr:any;
  admindata:any;
  image: any;
  upadate!: any;
  imageupdate!: any;
  messageSuccess: any;
  constructor(private route:Router, private usersService:UsersService) {
    this.admindata = JSON.parse( sessionStorage.getItem('admindata') !) ;
    this.imageupdate = new FormGroup({ avatar: new FormControl('', [Validators.required]), });
    this.upadate = new FormGroup({
     // photo: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      job: new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      // rating: new FormControl('', [Validators.required]),
      //earning : new FormControl('', [Validators.required]),
      github: new FormControl('', [Validators.required]),
      facebook: new FormControl('', [Validators.required]),
      instagram : new FormControl('', [Validators.required]),
      linkedin: new FormControl('', [Validators.required]),
     // password: new FormControl('', [Validators.required]),
     // password_confirmation: new FormControl('', [Validators.required]),
    });

  }

  getdata(email:string , adresse :string, id:any){
    this.messageSuccess=''
    this.admindata.id = id 
    this.admindata.email = email
     this.admindata.adresse = adresse 

  }
  logout(){

    this.usersService.logout();
    this.route.navigate(['/login']);
   
  }
  fileChange(event:any) {
    this.image =event.target.files[0];   
  }
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
        
        this.usersService.updateimageuser(this.admindata.id,imageformadata).subscribe(response=>
          {
            
            
            sessionStorage.setItem( 'admindata', JSON.stringify( response ) );
            window.location.reload();
         
    
          },(err:HttpErrorResponse)=>{
          
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
   // formData.append('avatar', this.image );
    formData.append('firstname', this.upadate.value.firstname);
    formData.append('lastname', this.upadate.value.lastname);
    formData.append('email', this.upadate.value.email);
    formData.append('adresse', this.upadate.value.adresse);
    formData.append('phone', this.upadate.value.phone);
    formData.append('job', this.upadate.value.job);
    formData.append('description', this.upadate.value.description);
    formData.append('birthday', this.upadate.value.birthday);
   // formData.append('earning', this.upadate.value.earning);
    formData.append('github', this.upadate.value.github);
    formData.append('facebook', this.upadate.value.facebook);
    formData.append('instagram', this.upadate.value.instagram);
    formData.append('linkedin', this.upadate.value.linkedin);
    formData.append('password', this.upadate.value.password);
    //formData.append('password_confirmation', this.upadate.value.password_confirmation);
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
    this.usersService.updateProfileUser(this.admindata.id,formData).subscribe(response=>
      {
        
        sessionStorage.setItem( 'admindata', JSON.stringify( response ) );
        window.location.reload();
        let indexId=this.admindata.findIndex((obj:any)=>obj.id==this.admindata.id)

        this.admindata[indexId].email=data.email
      //  this.admindata[indexId].photo=data.photo
        this.admindata[indexId].firstname=data.firstname
        this.admindata[indexId].lastname=data.lastname
        this.admindata[indexId].adresse=data.adresse
        this.admindata[indexId].phone=data.phone
        this.admindata[indexId].job=data.job
        this.admindata[indexId].description=data.description
        this.admindata[indexId].birthday=data.birthday
       // this.admindata[indexId].earning=data.earning
        this.admindata[indexId].github=data.github
        this.admindata[indexId].facebook=data.facebook
        this.admindata[indexId].instagram=data.instagram
        this.admindata[indexId].linkedin=data.linkedin
       this.admindata[indexId].password=data.password
       // this.admindata[indexId].password_confirmation=data.password_confirmation

        this.messageSuccess=`this email : ${this.admindata[indexId].email} is updated`

      },(err:HttpErrorResponse)=>{
      })
     this.route.navigate(['/dashboard']);
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  ngOnInit(): void {

  }

}