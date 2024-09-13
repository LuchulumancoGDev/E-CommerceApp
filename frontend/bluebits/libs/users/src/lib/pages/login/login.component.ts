import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'users-login',
  standalone: true,
  imports: [InputGroupAddonModule
    ,InputGroupModule,InputTextModule, CommonModule,PasswordModule,ButtonModule,FormsModule,ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  isSubmitted = false;

  constructor(private formbuilder:FormBuilder) {

  }
  ngOnInit(): void {
    this._initLoginForm();
  }

  onSubmit() {
    this.isSubmitted = true;
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
