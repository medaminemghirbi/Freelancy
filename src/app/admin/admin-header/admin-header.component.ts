import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  searchedKeyword!:string;
  

  messageErr:any;
  admindata:any;
  constructor(private route:Router, private usersService:UsersService) {
  this.admindata = JSON.parse( sessionStorage.getItem('admindata') !);
  
  }
  ngOnInit(): void {
  
  }
  logout(){
  
      this.usersService.logout();
      this.route.navigate(['/login']);
     
    }
  }
  