import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { CategoriesService, Category } from '@bluebits/products';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-categories-form',
  standalone: true,
  providers:[MessageService],
  imports: [CardModule, ToolbarModule,CommonModule, ToastModule, ButtonModule,InputTextModule,FormsModule,ReactiveFormsModule],
  templateUrl: './categories-form.component.html',
  styles: ``
})
export class CategoriesFormComponent implements OnInit{
  isSubmited = false;
  editmode = false;
  currentCategoryId: string|undefined;

  form: FormGroup | any;
  constructor(private formBuilder: FormBuilder,
    private messageService: MessageService,
    private categoryService: CategoriesService,
    private location: Location,
    private route: ActivatedRoute

  ) { }

   ngOnInit(): void {
     this.form = this.formBuilder.group({
       name: ['',Validators.required],
       icon:['', Validators.required],
     })
     this._checkEditMode();
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editmode = true;
        this.currentCategoryId = params['id'];
        this.categoryService.getCategory(params['id']).subscribe(category => {

          this.form.controls['name'].setValue(category.name);
          this.form.controls['icon'].setValue(category.icon);
        })



      }
    })
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.form.valid) {
      console.log("Name", this.form.controls.name.value);
      console.log("Icon", this.form.controls.icon.value);

      const category: Category = {
        id:this.currentCategoryId,
        name: this.form.controls.name.value,
        icon:this.form.controls.icon.value

      }

      if (this.editmode) {
        this._updateCategory(category);
      }
      else {
        this._addCategory(category);
      }



    }
    else {
      return;


    }


  }

  private _updateCategory(category: Category) {
    this.categoryService.updateCategory(category).subscribe(r => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is updated' });
        timer(2000).toPromise().then(done => {
          this.location.back();
        } )
      },
        (error)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category has not been updated' });
      });
  }

  private _addCategory(category:Category) {
     this.categoryService.createCategory(category).subscribe(r => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is created' });
        timer(2000).toPromise().then(done => {
          this.location.back();
        } )
      },
        (error)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category has not been created' });
      });
  }
}
