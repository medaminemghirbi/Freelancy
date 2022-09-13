import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postulated-mission-freelancer',
  templateUrl: './postulated-mission-freelancer.component.html',
  styleUrls: ['./postulated-mission-freelancer.component.css']
})
export class PostulatedMissionFreelancerComponent implements OnInit {
  p:number = 1 ;
  freelancerdata: any;
  messageErr: any;
  counter:any
  dataArray: any = [];
  messageSuccess : any ;
  submitted: boolean = false ;
  searchedKeyword!:string;
  constructor(private route:Router, private usersService:UsersService) {
    this.freelancerdata = JSON.parse( sessionStorage.getItem('freelancerdata') !);
    console.log(this.freelancerdata)
  }
  dataMission = {
    id : '',
    title:'',
    description:''
  }
  ngOnInit(): void {
    this.usersService.getrequestbyfreelancer(this.freelancerdata.id).subscribe(
      (response:any)=>{
      console.log(response)
      
      this.dataArray = response 
      this.counter = this.dataArray.length
      sessionStorage.setItem( 'status', JSON.stringify( response.status ) )
      , (err:HttpErrorResponse)=>{
        console.log(err)
      this.messageErr="We dont't found this mission in our database"} 
      //console.log(this.dataArray)
    }) ;
  }

  key = 'id' ;
  reverse: boolean = false ;

  sort(key: string) {
    this.key = key ;
    this.reverse = !this.reverse ;
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
        this.usersService.deleteRequest(id).subscribe(response=>{
          console.log(response)
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
  
    getdata(title:string,description:string,id:any){
      this.messageSuccess=''
      this.dataMission.title=title
      this.dataMission.description=description
      this.dataMission.id=id
      console.log(this.dataMission)
  
    }
    logout(){
  
      this.usersService.logout();
      this.route.navigate(['/login']);
     
    }
}