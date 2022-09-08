import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {

  p:number = 1 ;
  counter:any
  dataStudent={
    id : '',
    title:'',
    description:''
   /* averagePayment:0 ,
    period:0,
    start_date:'',
    end_date:'',
    */
  }
  messageErr =''
  
  messageSuccess = '' ;
  title: string ="" ;
  searchedKeyword!:string;
  dataArray: any;
  admindata:any
  constructor(private usersService:UsersService,private route:Router) {
    this.admindata = JSON.parse( sessionStorage.getItem('admindata') !);

  }
  messageErrr =''


  ngOnInit(): void {
    this.usersService.getAllMissions().subscribe(data=>{
      console.log(data)
    
      
      this.dataArray=data 
      this.counter = this.dataArray.length, (err:HttpErrorResponse)=>{

      this.messageErr="We dont't found this student in our database"} 

    }) 

    /*
    this.produitServiceService.getAllusers().subscribe(data=>{

      this.dataArrays=data , (err:HttpErrorResponse)=>{
 
      this.messageErrr="We dont't found this user in our database"} 
    
    }) 
    */
  }
  /*
  search() {
    if(this.title == "") 
      this.ngOnInit() ;
    else {
      this.posts = this.posts.filter(res =>{
        return this.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase())
      }) 
    } 
  }
  */

  key = 'id' ;
  reverse: boolean = false ;

  sort(key: string) {
    this.key = key ;
    this.reverse = !this.reverse ;
  }
  details(id:any){
    this.route.navigate(['/posts/'+id])
  }



  delete(id: any, i: number) {
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
        this.usersService.deleteMission(id).subscribe(response => {

          console.log(response)
          if (response.status == '200') {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.dataArray.splice(i, 1)
          }
          if (response.status == '401') {
            Swal.fire(
              'not Deleted!',
              'You cant delete an active mission.',
              'error'
            )
          }

        })

      }
    })


  }
    getdata(title:string,description:string,id:any){
      this.messageSuccess=''
      this.dataStudent.title=title
      this.dataStudent.description=description
      this.dataStudent.id=id
  
    }
    updatenewstudent(f:any){
      let data=f.value
      this.usersService.updateMission(this.dataStudent.id,data).subscribe(response=>
        {
          let indexId=this.dataArray.findIndex((obj:any)=>obj.id==this.dataStudent.id)
  
          this.dataArray[indexId].title=data.title
          this.dataArray[indexId].description=data.description
  
          this.messageSuccess=`this title : ${this.dataArray[indexId].title} is updated`
  
        },(err:HttpErrorResponse)=>{
        
        })
    }
  
    logout(){
  
      this.usersService.logout();
      this.route.navigate(['/login']);
     
    }

}
