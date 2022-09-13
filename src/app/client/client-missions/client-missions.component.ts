import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-missions',
  templateUrl: './client-missions.component.html',
  styleUrls: ['./client-missions.component.css']
})
export class ClientMissionsComponent implements OnInit {
  //language_id : any ;
  languages: { "id": number, "name": string }[] = []
  selectedDefaultLanguage: any
  languagedata: any = []

  dropdownList: any[] = [];
  selectedItems: any;
  test1: string = "";
  dropdownSettings: any = {};

  counter:number=0;
  p: number = 1;
  dataMission = {
    id: '',
    title: '',
    description: '',
    duration: '',
    beginingDate: '',
    category_name:'',
    category_id: '',
    language_id: 0,
    budget: '',
    requests_count:0
  }

  addmissionn: any;
  messageErr = ''
  messageError: any;
  messageSuccess = '';
  date: any;
  title: string = "";
  searchedKeyword!: string;
  dataArray: any;
  dataArrayy: any;
  clientdata: any;
  submitted: boolean = false;

  constructor(private usersService: UsersService, private route: Router) {
    this.clientdata = JSON.parse(sessionStorage.getItem('clientdata')!);

    this.addmissionn = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      beginingDate: new FormControl('', [Validators.required]),
      budget: new FormControl('', [Validators.required]),
      category_id: new FormControl('', [Validators.required]),
      language_id: new FormControl(this.selectedItems , [Validators.required]),
    });



  }

  onItemSelect(item: any) {
    this.selectedItems.push(item)

    this.test1.concat(item.id)
    
  }

  onItemDeSelect(item: any) {
    for (var i = 0; i < this.selectedItems.length; i++) {

      if (this.selectedItems[i] === item.id) {

        this.selectedItems.splice(i, 1);

      }
    }
  }

  onSelectAll(items: any) {
 
  }

  ngOnInit(): void {

    /*-----Load Langugage---*/
    this.usersService.getAllLanguages().subscribe(language => {
      //
      language.forEach((l: { [x: string]: any; }) => this.languages.push({ "id": l["id"], "name": l["name"] }));
      this.languagedata = language

      this.languagedata.forEach((element: any) => {
    
      });
      (err: HttpErrorResponse) => {
 
        this.messageErr = "We dont't found this langugae in our database"
      }
    })

    this.dropdownList = this.languages

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


    this.usersService.getclientmission(this.clientdata.id).subscribe(data => {

      this.dataArray = data
      console.log(this.dataArray)
      this.counter=this.dataArray.length, (err: HttpErrorResponse) => {

        this.messageErr = "We dont't found this mission in our database"
      }

    })


    /*------------- categories -------------------------- */
    this.usersService.getAllcategories().subscribe(data => {
     
      this.dataArrayy = data,
        (err: HttpErrorResponse) => {
   
          this.messageErr = "We dont't found this category in our database"
        }
    })

  }

  key = 'id';
  reverse: boolean = false;

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
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

  getdata(title: string, description: string, duration: string, beginingDate: string, budget: string, category_id: string, language_id: number, id: any) {
    this.messageSuccess = ''
    this.dataMission.title = title

    this.dataMission.title = title
    this.dataMission.duration = duration
    this.dataMission.beginingDate = beginingDate
    this.dataMission.budget = budget
    this.dataMission.category_id = category_id
    this.dataMission.language_id = language_id
    this.dataMission.description = description
    this.dataMission.id = id


  }

  updatemission(f: any) {
    let data = f.value
    const formData = new FormData();
    
    formData.append('title', this.addmissionn.value.title);
    formData.append('description', this.addmissionn.value.description);
    formData.append('duration', this.addmissionn.value.duration);
    formData.append('beginingDate', this.addmissionn.value.beginingDate);
    formData.append('budget', this.addmissionn.value.budget);
    formData.append('category_id', this.addmissionn.value.category_id);
    formData.append('client_id', this.clientdata.id);
    formData.append('language_id', JSON.stringify(this.selectedItems) );

    
    this.usersService.updateMission(this.dataMission.id, formData).subscribe((response) => {
      
      this.date = moment(Date.now()).format("YYYY-MM-DD");
      
      if (data.beginingDate > this.date) {

        this.submitted = true;
        let indexId = this.dataArray.findIndex((obj: any) => obj.id == this.dataMission.id)

        this.dataArray[indexId].id = data.id
        this.dataArray[indexId].title = data.title
        this.dataArray[indexId].description = data.description
        this.dataArray[indexId].duration = data.duration
        this.dataArray[indexId].beginingDate = data.beginingDate
        this.dataArray[indexId].budget = data.budget
        this.dataArray[indexId].category_id = data.category_id
        //this.dataArray[indexId].language_id = 4
        this.dataArray[indexId].language_id =  this.selectedItems
       // 
      //  this.selectedItems = data.language_id
        this.messageSuccess = `this title : ${this.dataArray[indexId].title} is updated`
        Swal.fire('Whooa!', 'Mission Succeffulfy updated !', 'success')
        window.location.reload();
     
      }
      else {
        this.messageError = "beginingDate must be after current date"


      }

    }, (err: HttpErrorResponse) => {

      this.messageError = "champs required or not valid !"
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'champs required or not valid !',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500
      })
    })



  }

}