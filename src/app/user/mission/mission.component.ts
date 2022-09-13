import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  languages: { "id": number, "name": string }[] = []
  selectedDefaultLanguage:any
  logo:any = "./assets/mission.png";
  logo1:any = "./assets/money-bag.png";
  //search = faSearch;
  freelancers:any;
  dataArraye:any = [];
  dataArray:any = [];
  datacate:any = [];
  languagedata:any = []
  datalanguage:any = [];
  messageErr ='';
  produits: any;
  freelancerdata: any;
  logged_in:boolean = false ;
  role: string = '';
  languagefiltre!: any;
  languageids:any= [];
  searchedKeyword!:string;
  
  constructor(private usersService:UsersService , private route : Router ) {
    this.freelancerdata = JSON.parse( sessionStorage.getItem('freelancerdata') !);
    this.logged_in = JSON.parse( sessionStorage.getItem('logged_in') !);
    this.selectedDefaultLanguage= null
    console.log(this.logged_in)

    this.role = JSON.parse( sessionStorage.getItem('role') !);
    console.log(this.role)

    this.languagefiltre = new FormGroup({
      language_id: new FormControl('', [Validators.required]),
    });
   }









  ngOnInit(): void {
    this.usersService.getAllMissions().subscribe(data=>{
      console.log(data)
      this.dataArray=data , (err:HttpErrorResponse)=>{
        console.log(err)
      this.messageErr="We dont't found this user in our database"} 
      //console.log(this.dataArray)
    }) 
    this.usersService.getAllcategories().subscribe(data=>{

      console.log(data)
      this.datacate=data , (err:HttpErrorResponse)=>{
        console.log(err)
      this.messageErr="We dont't found this user in our database"} 
      //console.log(this.dataArray)
    }) 
    this.usersService.getAllLanguages().subscribe(language=>{ 
      
      language.forEach((l: { [x: string]: any; }) => this.languages.push({ "id": l["id"], "name": l["name"] }));
    this.languagedata=language
    this.languagedata.forEach((element: any) => {
   console.log(element)
    });
    (err:HttpErrorResponse)=>{
    console.log(err)
    this.messageErr="We dont't found this langugae in our database"}
    }) 
    this.getallmiss()
  }
  getallmiss () {
    this.usersService.getAllMissions().subscribe(data=>{
      console.log(data)
      this.dataArray =data , (err:HttpErrorResponse)=>{
        console.log(err)
      this.messageErr="We dont't found this user in our database"} 
      //console.log(this.dataArray)
    }) 
  }
  missionbycategory ( category_id : any ) {
    this.usersService.getmissionbycategory(category_id).subscribe(response=>{
      console.log(response)
       this.dataArray = response ;
    })
}

missionbylanguages (  ) {
  this.languageids.push(this.selectedDefaultLanguage)
  this.usersService.getmissionbylanguage(this.languageids).subscribe(response=>{
    console.log(response)
    
     this.dataArray = response ;
  })
}
missionbybudget( budget : any ) {
  this.usersService.getmissionbybudget(budget).subscribe(response=>{
    console.log(response)
     this.dataArray = response ;
  })
}
 ///****************************************************  addrequest  ************************************///
 addrequest(id: any) {

  if (this.freelancerdata) {
    const formData = new FormData();
    formData.append('mission_id', id);
    formData.append('freelancer_id', this.freelancerdata.id);
    formData.append('status', status);

    this.usersService.addRequest(formData).subscribe(() => {
      this.route.navigate(['/postulated-missions-freelancer'])
      console.log(formData)
      Swal.fire('Saved!', '', 'success')
    }, (err: HttpErrorResponse) => {
      this.messageErr = err.error

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You cant postulate twice '
      })

    });
  }
  else {
    Swal.fire('you must logged_in !', '', 'error')
    this.route.navigate(['/login'])
  }


}
addfavoris(id: any ) {

  if (this.freelancerdata) {
    const formData = new FormData();
    formData.append('mission_id', id);
    formData.append('user_id', this.freelancerdata.id);
    // let data=f.value   
   // console.log(formData)
    this.usersService.addFavoris(formData).subscribe(() => {
      this.route.navigate(['/favoris'])

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Add To Favorite Succefully  ',
        showConfirmButton: false,
        timer: 1500
      })
      // window.location.reload();


    }, (err: HttpErrorResponse) => {
      this.messageErr = err.error

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You cant twice ',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500
      })

    });
  }
  else {
    Swal.fire('you must logged_in !', '', 'error')
    this.route.navigate(['/login'])
  }
}



}