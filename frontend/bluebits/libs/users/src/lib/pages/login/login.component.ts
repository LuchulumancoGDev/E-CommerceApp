import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';


@Component({
    selector: 'users-login',
    imports: [InputGroupAddonModule,
        InputGroupModule, InputTextModule, CommonModule, PasswordModule, ButtonModule, FormsModule, ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styles: ``
})
export class LoginComponent implements OnInit {
  authError=false;
authMessage='Email or Password are wrong!';
  loginFormGroup!: FormGroup;
  isSubmitted = false;

  constructor(private formbuilder:FormBuilder, private auth:AuthService, private localstorageService:LocalstorageService,private router:Router) {

  }
  ngOnInit(): void {
    this._initLoginForm();
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.loginFormGroup.invalid)
      return;

    const loginData = {
      email: this.loginFormGroup.get('email')?.value,
      password: this.loginFormGroup.get('password')?.value
    };

    this.auth.login(loginData.email,loginData.password).subscribe(user=>{
      console.log(user);
      this.authError=false;
      this.localstorageService.setToken(user.token);
      this.router.navigate(['/']);


    },(error:HttpErrorResponse)=>{
      console.log(error);
      if(error.status===400){
        this.authMessage='Error in the server, please try again later';
      }
      this.authMessage=error.error;
      this.authError=true;

    });
  }
  private _initLoginForm() {
    this.loginFormGroup = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required]]
    })
  }

  get loginForm() {
    return this.loginFormGroup.controls
  }



}
