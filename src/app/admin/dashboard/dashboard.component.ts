import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataArray:any = [];
  searchedKeyword!:string;
  messageErr="" ;
  chartType:any;
  chartOptions: any 
  chartDatasets:any = []; 
  chartLabels:any = [];
  chartColors:any = [];
  chartReady = false;

  admindata:any;

  constructor(public UsersService:UsersService, public router:Router) { 
    this.chartType = 'bar';
    this.admindata = JSON.parse( sessionStorage.getItem('admindata') !);
 

    this.chartLabels = ['Users', 'Missions', 'Categories', 'Skills'];
  
    this.chartColors = [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
  
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
  
        ],
        borderWidth: 2,
      }
    ];
    this.chartOptions = {
      responsive: true
    };

    this.UsersService.countall().subscribe(result=>{
      
      this.chartDatasets =[ 
        { data: [result.data[0], result.data[1], result.data[2], result.data[3]],label: 'Freelancy Officiel statistic'  }
      ];
     // this.chartDatasets = [ this.chartDatasets[0] ]
     this.chartReady=true; 
      
      this.dataArray=result
      
 
      
         ,
       (err:HttpErrorResponse)=>{
      this.messageErr="We dont't found this user in our database"} 
    }) 
   
    
  }



  chartClicked(event: any): void {
  }

  chartHovered(event: any): void {
  }
  ngOnInit(): void {

  }
  logout(){
  
    this.UsersService.logout();
    this.router.navigate(['/login']);
   
  }
}
