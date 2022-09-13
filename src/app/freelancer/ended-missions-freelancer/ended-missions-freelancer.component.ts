import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ended-missions-freelancer',
  templateUrl: './ended-missions-freelancer.component.html',
  styleUrls: ['./ended-missions-freelancer.component.css']
})
export class EndedMissionsFreelancerComponent implements OnInit {

  p:number = 1 ;
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
  freelancerdata: any;
  submitted: boolean = false ;
  dataArrayy:any ;
  dataArrayyy:any ;
  update: FormGroup;

  constructor(private usersService:UsersService,private route:Router ,private activatedRoute: ActivatedRoute, ) {
    this.freelancerdata = JSON.parse( sessionStorage.getItem('freelancerdata') !);
    console.log(this.freelancerdata)

    this.update = new FormGroup({
      status: new FormControl(''),
      mission_id: new FormControl(''),
      freelancer_id: new FormControl(''),
    });
    
  }
  

  ngOnInit(): void {
    this.usersService.getendedmissionbyfreelancer(this.freelancerdata.id).subscribe(data=>{
      
      console.log(data)
      this.dataArray = data , (err:HttpErrorResponse)=>{
        console.log(err)
      this.messageErr="We dont't found this mission in our database"} 
      //console.log(this.dataArray)
    }) 
    this.usersService.freelancerhomedata(this.activatedRoute.snapshot.params['id']).subscribe(data=>{

      console.log(data)
      this.dataArrayy = data ,
       (err:HttpErrorResponse)=>{
        console.log(err)
      this.messageErr="We dont't found this user in our database"} 
      //console.log(this.dataArray)
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

    navigate(){
      var result = this.dataArray.map(function(a:any) {return a.filepath;});
      
      window.open(result);
    }


    ///****************************************************  addReview ************************************///
    addreview (id:any , user_id:any){
   
      //console.log(this.clicked)
      const formData = new FormData();
        formData.append('user_id',user_id );
        formData.append('mission_id',id );
       // formData.append('freelancer_id',this.freelancerdata.id);
       // formData.append('status',status);
     // let data=f.value   
      console.log(formData)
      this.usersService.addReview(formData).subscribe( ()=>{
          
          //console.log(data)
          console.log(formData)
          //this.submitted = true ;
          Swal.fire('Saved!', '', 'success')
         window.location.reload();
        this.route.navigate(['/ended-missions-freelancer'])
    
      },(err:HttpErrorResponse)=>{
        this.messageErr=err.error
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You cant rate  twice on the same mission '
        })
         
      }) ;

    }
    logout(){
  
      this.usersService.logout();
      this.route.navigate(['/login']);
     
    }
      }