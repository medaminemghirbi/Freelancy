import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent implements OnInit {
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
  