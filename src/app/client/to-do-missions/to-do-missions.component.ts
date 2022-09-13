import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-to-do-missions',
  templateUrl: './to-do-missions.component.html',
  styleUrls: ['./to-do-missions.component.css']
})
export class ToDoMissionsComponent implements OnInit {

  p:number = 1 ;
  dataMission = {
    id : '' ,
    status  : '',
    mission_id:'',
    freelancer_id:''
  }
  messageErr =''
  counter:any
  messageSuccess = '' ;
  title: string ="" ;
  searchedKeyword!:string;
  dataArray: any;
  clientdata: any;
  submitted: boolean = false ;
  dataArrayy:any ;
  dataArrayyy:any ;
  update: FormGroup;

  constructor(private usersService:UsersService,private route:Router ,private activatedRoute: ActivatedRoute, ) {
    this.clientdata = JSON.parse( sessionStorage.getItem('clientdata') !);
    console.log(this.clientdata)

    this.update = new FormGroup({
      status: new FormControl(''),
      mission_id: new FormControl(''),
      freelancer_id: new FormControl(''),
    });
    
  }
  

  ngOnInit(): void {
    this.usersService.getrequestacceptedbyclient(this.clientdata.id).subscribe(data=>{
      console.log(data)
      this.dataArray = data
      this.counter = this.dataArray.length , (err:HttpErrorResponse)=>{
        console.log(err)
      this.messageErr="We dont't found this mission in our database"} 
      //console.log(this.dataArray)
    }) 
    this.usersService.freelancerhomedata(+this.activatedRoute.snapshot.params['id']).subscribe(data=>{

      console.log(data)
      this.dataArrayy = data ,
       (err:HttpErrorResponse)=>{
        console.log(err)
      this.messageErr="We dont't found this user in our database"} 
      //console.log(this.dataArray)
    }) 


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
  
    getdata(status:string,mission_id:string,freelancer_id:any , id:any){
      this.messageSuccess=''
      this.dataMission.id=id
      this.dataMission.status=status
      this.dataMission.mission_id=mission_id
      this.dataMission.freelancer_id=freelancer_id
      console.log(this.dataMission)
  
    }
    updaterequest (f:any){

      let data=f.value
    const formData = new FormData();
    formData.append('status', this.update.value.status );
    formData.append('mission_id', this.update.value.mission_id);
    formData.append('freelancer_id', this.update.value.freelancer_id);

    Swal.fire('Whooa!', 'Request Succeffulfy updated !', 'success')
    this.usersService.updateRequest(this.dataMission.id,formData).subscribe(response=>
      {
      console.log(response)
      this.submitted = true ;
        let indexId=this.dataArray.findIndex((obj:any)=>obj.id==this.dataMission.id)

        //this.dataArray[indexId].id=data.id
        this.dataArray[indexId].status=data.status
        this.dataArray[indexId].mission_id=data.mission_id
        this.dataArray[indexId].freelancer_id=data.freelancer_id
        
        this.messageSuccess=`this status : ${this.dataArray[indexId].status} is updated`
        window.location.reload();
       this.route.navigate(['/postulated-missions-client']);
      
      },(err:HttpErrorResponse)=>{
        console.log(err.message)
      
      })

      
      
    }

}