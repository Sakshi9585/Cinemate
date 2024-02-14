import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // userName = "";
  // password = "";
  errorMsg = "";


  
  signupUsers: any[]=[];
  signupObj: any = {
    userName: '',
    email: '',
    password: ''
  };
  loginObj: any = {
    userName: '',
    password: ''
  };
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null){
      this.signupUsers = JSON.parse(localData);
    }
  }

  login() {
   
    if (this.loginObj.userName.trim().length === 0) {
      this.errorMsg = "userName is required";
    } else if (this.loginObj.password.trim().length === 0) {
      this.errorMsg = "Password is required";
    } else {
      this.errorMsg = "";
      const isUserExist = this.signupUsers.find(m => m.userName == this.loginObj.userName && m.password == this.loginObj.password);
      if (isUserExist !=undefined) {
        this.router.navigate(['home']);
      }
      else {
        this.errorMsg = "Invalid Credentials";
      }
    }
  }

    onSignUp(){
      this.signupUsers.push(this.signupObj);
      localStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));
      this.signupObj = {
        userName: '',
        email: '',
        password: ''
      };
    }
  

}