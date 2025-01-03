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
import { InputMaskModule } from 'primeng/inputmask';
import * as countriesLib from 'i18n-iso-countries';

declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
    selector: 'admin-users-form',
    providers: [MessageService],
    imports: [CardModule, EditorModule, InputMaskModule, DropdownModule, InputSwitchModule, InputTextareaModule, InputNumberModule, ToolbarModule, CommonModule, ColorPickerModule, ToastModule, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule],
    templateUrl: './users-form.component.html'
})
export class UsersFormComponent implements OnInit{

  countries: { id: string; name: string; }[] = [];
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
    this._getCountries();
    this._checkEditMode();
  }


onCancel() {
 this.location.back();
}

  private _getCountries() {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames("en", { select: "official" })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      }
    });

    console.log(this.countries);



  }

  createUser() {
    this.usersService.createUser(this.form.value).subscribe(
        response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully.' });
            this.location.back();
        },
        error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create user.' });
        }
    );
}

updateUser() {
    this.usersService.updateUser(this.form.value, this.currentUserId).subscribe(
        response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully.' });
            this.location.back();
        },
        error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update user.' });
        }
    );
}
  private initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: [''],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      street: [''],
      apartment: ['', ],
      zip: ['', ],
      city: ['', ],
      isAdmin: [false],
    })
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please correct the errors in the form.' });
        return;
    }

    if (this.editmode) {
        this.updateUser();
    } else {
        this.createUser();
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
          this.form.controls['password'].setValidators([]);
           this.form.controls['password'].updateValueAndValidity();
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
