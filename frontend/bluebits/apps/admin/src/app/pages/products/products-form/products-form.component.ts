import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@bluebits/products';
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

import { timer } from 'rxjs';


@Component({
    selector: 'admin-products-form',
    providers: [MessageService],
    imports: [CardModule, EditorModule, DropdownModule, InputSwitchModule, InputTextareaModule, InputNumberModule, ToolbarModule, CommonModule, ColorPickerModule, ToastModule, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule],
    templateUrl: './products-form.component.html',
    styleUrl: './products-form.component.css'
})
export class ProductsFormComponent implements OnInit{
  categories: Category[] | undefined;
 isSubmited = false;
  editmode = false;
  currentProductId: string | any;
  form: FormGroup | any;
  imageDisplay: string |any;

  constructor(private formBuilder: FormBuilder,
    private messageService: MessageService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    this._checkEditMode();
  }
  private getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;


    })
  }

onCancel() {
 this.location.back();
}
  onImageUpload(event: any)
  {
    const file = event.target.files[0];
    if (file)
    {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }

  private updateProduct(productData:FormData)
  {
    this.productsService.updateProduct(productData,  this.currentProductId).subscribe((productData:Product) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${productData.name} is updated` });
        timer(2000).toPromise().then(() => {
          this.location.back();
        } )
      },
        ()=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product has not been updated' });
      });
  }
  private addProduct(productData:FormData)
  {
    this.productsService.createProduct(productData).subscribe((productData:Product) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${productData.name} is created` });
        timer(2000).toPromise().then(() => {
          this.location.back();
        } )
      },
        ()=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product has not been created' });
      });
  }
  private initForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      countInStock: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      richDescription: new FormControl('Testing'),
      image: new FormControl('', Validators.required),
      isFeatured: new FormControl(false)
    });
  }
  onSubmit() {
    this.isSubmited = true;
  if (this.form.invalid)
      return;

    const productFormData = new FormData();
      Object.keys(this.form.controls).map((key) => {
      const control = this.form.get(key);
      if (control) {
        productFormData.append(key, control.value);
      }
      });
    if (this.editmode)
    {
      this.updateProduct(productFormData);
    }
    else {
         this.addProduct(productFormData);
    }


  }
   private _checkEditMode(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentProductId = params['id'];
        this.productsService.getProduct(params['id']).subscribe((product) => {
          this.form.patchValue({
            name: product.name,
            brand: product.brand,
            price: product.price,
            category: product.category?.id,
            countInStock: product.countInStock,
            description: product.description,
            richDescription: product.richDescription,
            isFeatured: product.isFeatured
          });
          this.imageDisplay = product.image;
          this.form.get('image')?.clearValidators();
          this.form.get('image')?.updateValueAndValidity();
  

        });
      }
    });
  }



}
