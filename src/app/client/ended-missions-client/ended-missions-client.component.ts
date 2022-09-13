import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ended-missions-client',
  templateUrl: './ended-missions-client.component.html',
  styleUrls: ['./ended-missions-client.component.css']
})
export class EndedMissionsClientComponent implements OnInit {
  paymentHandler: any = null;

  success: boolean = false
  
  failure:boolean = false

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
    paydata:any;
    dataArrayyy:any ;
    update: FormGroup;
    count: any;
    data: any =[];
  
    constructor(private checkout: CheckoutService,private usersService:UsersService,private route:Router ,private activatedRoute: ActivatedRoute ) {
      this.clientdata = JSON.parse( sessionStorage.getItem('clientdata') !);
      console.log(this.clientdata)
  
      this.update = new FormGroup({
        status: new FormControl(''),
        mission_id: new FormControl(''),
        freelancer_id: new FormControl(''),
      });
      /*render(
        {
            id: "#myPaypalButtons",
            currency: "USD",
            value: "100.00",
            onApprove: (details) => {           
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'transcation sucess',
                showConfirmButton: false,
                timer: 1500
              })
            }
          }
        );*/
    }
    
  
    ngOnInit(): void {
      this.usersService.getendedmissionbyclient(this.clientdata.id).subscribe(data=>{
        console.log(data)
        this.dataArray = data 
        this.counter = this.dataArray.length, (err:HttpErrorResponse)=>{
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
  
      this.invokeStripe();
    }
  
    makePayment(amount: number) {
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51KsTRVAP0C7RxDT0uiUbJJmJMRnP7ijbDLlO3B1FSfNpRW5FMgbZ7YgTzKcNRXAERgcvjWvsZKLdZMZovyjlxeVX00Ssa2dzww',
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken);
          paymentstripe(stripeToken);
        },
      
      });
  
      const paymentstripe = (stripeToken: any) => {
        this.checkout.makePayment(stripeToken,amount).subscribe((data: any) => {
          console.log(data);
          if (data.data === "success") {
            this.success = true
          }
          else {
            this.failure = true
          }
        });
      };
  
      paymentHandler.open({
        name: 'Freelancy Payement',
        description: 'Freelancy Payement system',
        amount: amount * 100,
      });
    }
  
    invokeStripe() {
      if (!window.document.getElementById('stripe-script')) {
        const script = window.document.createElement('script');
        script.id = 'stripe-script';
        script.type = 'text/javascript';
        script.src = 'https://checkout.stripe.com/checkout.js';
        script.onload = () => {
          this.paymentHandler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_51KsTRVAP0C7RxDT0uiUbJJmJMRnP7ijbDLlO3B1FSfNpRW5FMgbZ7YgTzKcNRXAERgcvjWvsZKLdZMZovyjlxeVX00Ssa2dzww',
            locale: 'auto',
            token: function (stripeToken: any) {
              console.log(stripeToken);
            },
          });
        };
  
        window.document.body.appendChild(script);
      }
    }
  


pay(data:any){
  this.checkout.paywithkonnect(data).subscribe(response => {
    this.paydata = response;
    window.open(this.paydata.payUrl);
  
   // window.location.replace(this.paydata.payUrl);
    //window.location.reload()
    console.log(response);
  });
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
          this.usersService.deleteMission(id).subscribe(response=>{
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
  
      ratingClient ( id : any ) {
        this.usersService.ratingclient(id).subscribe(data=>{
          sessionStorage.setItem( 'count', JSON.stringify( data ) );
          
          console.log(this.data)
          this.count=data , (err:HttpErrorResponse)=>{
            console.log(err)
          this.messageErr="We dont't found this user in our database"} 
          //console.log(this.dataArray)
        }) 
      }
  
      ///****************************************************  addReview ************************************///
      addreview (id:any , user_id:any){
     
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
          this.route.navigate(['/ended-missions-client'])
      
        },(err:HttpErrorResponse)=>{
          this.messageErr=err.error
           
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You cant rate  twice '
          })
           
        }) ;
  
      }
  
  }