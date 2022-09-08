import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  counter:any
  dataArray:any = []
  p:number = 1 ;
 
  messageErr =''
  messageSuccess = '' ;
  name: string ="" ;
  searchedKeyword!:string;


  image: any;
  // add! :  FormGroup;
  submitted: boolean = false ; 
  update!: FormGroup;
  admindata:any

  dataLang ={
    id : '',
    name:''
  }

  constructor(private usersService:UsersService,private route:Router) { 
    this.admindata = JSON.parse( sessionStorage.getItem('admindata') !) ;

   /* this.add = new FormGroup({
      name: new FormControl('' )
      
    });  */
    this.update = new FormGroup({
      name: new FormControl('' )
      
    });
    
  }

  ngOnInit(): void {
    this.usersService.getAllLanguages().subscribe(data=>{
      // debugger
      
      this.dataArray=data 
      this.counter = this.dataArray.length, (err:HttpErrorResponse)=>{
      this.messageErr="We dont't found this category in our database"} 
    }) 
  }

  addlanguage (f:any){
    // const formData = new FormData();
   
    // formData.append('name', this.add.value.name);
    let data=f.value
    
    Swal.fire({
      title: 'Do you want to Add this langugage?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.usersService.addLanguage(data).subscribe( ()=>{
          this.submitted = true ;
          window.location.reload();
        //this.router.navigate(['/posts'])
  
      },(err:HttpErrorResponse)=>{
        this.messageErr=err.error
         
      }) ;
  
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
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
        this.usersService.deleteLanguage(id).subscribe(response=>{
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

  getdata(name:string,id:any){
    this.messageSuccess=''
    this.dataLang.name= name 
   
    this.dataLang.id= id 

  }

  updatenewlanguage(f:any){
    let data=f.value
    const formData = new FormData();
    
    formData.append('name', this.update.value.name);
    Swal.fire('Whooa!', 'Language Succeffully updated !', 'success')
    this.usersService.updateLanguage(this.dataLang.id,formData).subscribe(response=>
      {
        this.submitted = true ;

        let indexId=this.dataArray.findIndex((obj:any)=>obj.id==this.dataLang.id)

        //this.dataArray[indexId].id=data.id
        this.dataArray[indexId].name=data.name
        
        this.messageSuccess=`this name : ${this.dataArray[indexId].name} is updated`
        window.location.reload();
       this.route.navigate(['/alllanguages']);
      
      },(err:HttpErrorResponse)=>{
      
      })

}
logout(){

  this.usersService.logout();
  this.route.navigate(['/login']);
 
}
}