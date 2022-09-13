import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mission-requests-client',
  templateUrl: './mission-requests-client.component.html',
  styleUrls: ['./mission-requests-client.component.css']
})
export class MissionRequestsClientComponent implements OnInit {

  p:number = 1 ;
  counter:number=0;
  dataMission = {
    id : '' ,
    status  : '',
    mission_id:'',
    freelancer_id:''
  }
  messageErr =''
  
  messageSuccess = '' ;
  title: string ="" ;
  searchedKeyword!:string;
  dataArray: any;
  clientdata: any;
  submitted: boolean = false ;
  dataArrayy:any ;
  dataArrayyy:any ;
  update: FormGroup; 
  missionAcceptedValue:any=[]
  test:boolean = false
  i:any
  y:any=false
  testi:any
  missionId:any
  constructor(private usersService:UsersService,private route:Router ,private activatedRoute: ActivatedRoute, ) {
    this.clientdata = JSON.parse( sessionStorage.getItem('clientdata') !);


    this.update = new FormGroup({
      status: new FormControl(''),
      mission_id: new FormControl(''),
      freelancer_id: new FormControl(''),
    });
    
  }
  

  ngOnInit(): void {
    this.usersService.getrequestbyclient(this.clientdata.id).subscribe(data=>{
     
      this.dataArray = data
      console.log(this.dataArray.request)
      this.counter = this.dataArray.request.length
      //let missionId = this.dataArray.request[0].mission_id
/*      debugger 

      if( this.dataArray.request[0].status === "accepted"){
        this.missionAcceptedValue.push(this.dataArray.request[0])
        this.testi = true}
      else
        this.testi = false*/
      for(let i=0; i<this.dataArray.request.length; i++){
        if( this.dataArray.request[i].status === "accepted" ){
          this.missionAcceptedValue = this.dataArray.request[i]
          this.missionId = this.dataArray.request[i].mission_id
          this.i++
          return
        }
      }
      if(this.i === 0)
        this.y = true
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
          window.location.reload();
       
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
      
      if(this.missionAcceptedValue !== null){
        this.y = false
        if( mission_id ===  this.missionAcceptedValue.mission_id && freelancer_id === this.missionAcceptedValue.freelancer_id ){
          this.test = true
          this.y = true
        }
        else{
          this.test = false
        }

        if(this.missionId != mission_id){
          this.test = true
          this.y = true

        }

      }
      else{
        this.test = true
        this.y = true
      }
      
      this.messageSuccess=''
      this.dataMission.id=id
      this.dataMission.status=status
      this.dataMission.mission_id=mission_id
      this.dataMission.freelancer_id=freelancer_id
   
  
    }
    updaterequest (f:any){

      let data=f.value
    const formData = new FormData();
    formData.append('status', this.update.value.status );
    formData.append('mission_id', this.update.value.mission_id);
    formData.append('freelancer_id', this.update.value.freelancer_id);
    Swal.fire({
      title: 'Action Irreversible,Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.usersService.updateRequest(this.dataMission.id,formData).subscribe(response=>
          {
           
        
          this.submitted = true ;
            let indexId=this.dataArray.findIndex((obj:any)=>obj.id==this.dataMission.id)
    
            //this.dataArray[indexId].id=data.id
            this.dataArray[indexId].status=data.status
            this.dataArray[indexId].mission_id=data.mission_id
            this.dataArray[indexId].freelancer_id=data.freelancer_id
            
            this.messageSuccess=`this status : ${this.dataArray[indexId].status} is updated`
            
           this.route.navigate(['/postulated-missions-client']);
          
          },(err:HttpErrorResponse)=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'You cant update twice!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
          
          })
        Swal.fire('Saved!', '', 'success')
        window.location.reload();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })


    
      
    }
    alert(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You cant update twice!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    
    }
}