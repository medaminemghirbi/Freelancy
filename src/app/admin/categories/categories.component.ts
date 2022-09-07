import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  counter:any
  addcategorie! :  FormGroup;
  messageErr="" ;
  image:any;
  submitted : boolean = false ;
  dataArray:any = []
  p:number = 1 ;

  //categories :Category[] = [] ;
  messageSuccess = '' ;
  name: string ="" ;
  searchedKeyword!:string;

  dataCat={
    id : '',
    name:'',
    avatar:'' ,
   /* averagePayment:0 ,
    period:0,
    start_date:'',
    end_date:'',
    */
  }

  update! :  FormGroup;


  constructor(private usersService:UsersService,private route:Router) { 
    this.update = new FormGroup({
      name: new FormControl(''),
      avatar: new FormControl(''),
    });
    this.addcategorie = new FormGroup({
      name: new FormControl('', [Validators.required]),
      avatar: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.usersService.getAllcategories().subscribe(data=>{
      // debugger
      
      this.dataArray=data 
      this.counter = this.dataArray.length, (err:HttpErrorResponse)=>{
      this.messageErr="We dont't found this category in our database"} 
    }) 
  }

  key = 'id' ;
  reverse: boolean = false ;

  sort(key: string) {
    this.key = key ;
    this.reverse = !this.reverse ;
  }
  details(id:any){
    this.route.navigate(['/categories/'+id])
  }

  delete(id:any  , i :number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteCat(id).subscribe(response=>{
          this.dataArray.splice(i,1)   
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

    
  }

  getdata(name:string,image_url:string,id:any){
    this.messageSuccess=''
    this.dataCat.name= name 
    this.dataCat.avatar =image_url 
    this.dataCat.id= id 

  }
  fileChange(event:any) {
    this.image =event.target.files[0];
    
  }
  
  updatenewcat(f:any){
    let data=f.value
    const formData = new FormData();
    formData.append('avatar', this.image );
    formData.append('name', this.update.value.name);
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.usersService.updateCat(this.dataCat.id,formData).subscribe(response=>
          {
          this.submitted = true ;
            let indexId=this.dataArray.findIndex((obj:any)=>obj.id==this.dataCat.id)
    
            //this.dataArray[indexId].id=data.id
            this.dataArray[indexId].name=data.name
            this.dataArray[indexId].avatar=data.avatar
            this.messageSuccess=`this name : ${this.dataArray[indexId].name} is updated`
            window.location.reload();
           this.route.navigate(['/categories']);
          
          },(err:HttpErrorResponse)=>{
          
          })
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })


}
addcategory (f:any){
  const formData = new FormData();
  formData.append('avatar', this.image );
  formData.append('name', this.addcategorie.value.name);
  let data=f.value
  
  
  this.usersService.addcategory(formData).subscribe( ()=>{
      window.location.reload();
      Swal.fire('Saved!', '', 'success')
    this.route.navigate(['/categories'])

  },(err:HttpErrorResponse)=>{
    this.messageErr=err.error

     
  }) ;
}
fileChangeadd(event:any) {
  this.image =event.target.files[0];
  
}


}