import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerr:any = "https://imgs.bharatmatrimony.com/bmimgs/login/login-otp-banner.png";

  constructor() { }

  ngOnInit(): void {
  }

}
