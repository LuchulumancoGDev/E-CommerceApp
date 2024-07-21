import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, ProductsService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'admin-products-form',
  standalone: true,
   providers:[MessageService],
  imports: [CardModule, EditorModule,DropdownModule,InputSwitchModule,InputTextareaModule,InputNumberModule,ToolbarModule,CommonModule,ColorPickerModule, ToastModule, ButtonModule,InputTextModule,FormsModule, ReactiveFormsModule],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css'
})
export class ProductsFormComponent implements OnInit{
onCancel() {
throw new Error('Method not implemented.');
}
onSubmit() {
throw new Error('Method not implemented.');
  }
  categories: Category[] | undefined;

 isSubmited = false;
  editmode = false;
  currentProductId: string | undefined;
  form: FormGroup | any;
  constructor(private formBuilder: FormBuilder,
    private messageService: MessageService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    // private location: Location,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    //this._checkEditMode();
  }
  private getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }
  private initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [''],
    })
  }
  private _checkEditMode() {
    throw new Error('Method not implemented.');
  }



}
