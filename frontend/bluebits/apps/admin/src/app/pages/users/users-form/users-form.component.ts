import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, ProductsService } from '@bluebits/products';
import { User } from 'libs/users/src/lib/models/user';
import { UsersService } from 'libs/users/src/lib/users.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-users-form',
  standalone: true,
  providers:[MessageService],
  imports: [CardModule, EditorModule,DropdownModule,InputSwitchModule,InputTextareaModule,InputNumberModule,ToolbarModule,CommonModule,ColorPickerModule, ToastModule, ButtonModule,InputTextModule,FormsModule, ReactiveFormsModule],
  templateUrl: './users-form.component.html'
})
export class UsersFormComponent implements OnInit{


 isSubmited = false;
  editmode = false;
  currentUserId: string | any;
  form: FormGroup | any;


    constructor(private formBuilder: FormBuilder,
    private messageService: MessageService,
    private usersService: UsersService,
      private location: Location,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.initForm();

    this._checkEditMode();
  }


onCancel() {
 this.location.back();
}


  private updateUser(userData:FormData)
  {
    this.usersService.updateUser(userData,  this.currentUserId).subscribe((userData:User) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `User ${userData.name} is updated` });
        timer(2000).toPromise().then(() => {
          this.location.back();
        } )
      },
        ()=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User has not been updated' });
      });
  }
  private addUser(userData:FormData)
  {
    this.usersService.createUser(userData).subscribe((userData:User) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `user ${userData.name} is created` });
        timer(2000).toPromise().then(() => {
          this.location.back();
        } )
      },
        ()=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User has not been created' });
      });
  }
  private initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      apartment: ['', ],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      isAdmin: [false],
    })
  }
  onSubmit() {
    this.isSubmited = true;
  if (this.form.invalid)
      return;

    const userFormData = new FormData();
      Object.keys(this.form.controls).map((key) => {
      const control = this.form.get(key);
      if (control) {
        userFormData.append(key, control.value);
      }
      });
    if (this.editmode)
    {
      this.updateUser(userFormData);
    }
    else {
         this.addUser(userFormData);
    }


  }
  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.usersService.getUser(params['id']).subscribe(user => {




          this.form.controls['name'].setValue(user.name);
          this.form.controls['isAdmin'].setValue(user.isAdmin);
          this.form.controls['email'].setValue(user.email);
          this.form.controls['country'].setValue(user.country);
          this.form.controls['password'].setValue(user.password);
          this.form.controls['phone'].setValue(user.phone);
          this.form.controls['street'].setValue(user.street);
          this.form.controls['apartment'].setValue(user.apartment);
          this.form.controls['zip'].setValue(user.zip);
          this.form.controls['city'].setValue(user.city);




        })




      }
    })
  }
}
