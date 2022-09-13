import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-freelancer-header',
  templateUrl: './freelancer-header.component.html',
  styleUrls: ['./freelancer-header.component.css']
})
export class FreelancerHeaderComponent implements OnInit {
  searchedKeyword!:string;
  

  messageErr:any;
  admindata:any;
  constructor(private route:Router, private usersService:UsersService) {
  this.admindata = JSON.parse( sessionStorage.getItem('freelancerdata') !);
  
  }
  ngOnInit(): void {
  
  }
  logout(){
  
      this.usersService.logout();
      this.route.navigate(['/login']);
     
    }
  }
  