import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductService } from '../../../core/services/product.service';
import { CreateProductDto } from '../../../core/models/product.model';


@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="create-container">
      <div class="header">
        <h2>Crear Nuevo Producto</h2>
      </div>

      @if (successMessage()) {
        <div class="success-box">
          <p>{{ successMessage() }}</p>
        </div>
      }

      @if (error()) {
        <div class="error-box">
          <p>{{ error() }}</p>
        </div>
      }

      <form [formGroup]="productForm" (ngSubmit)="createProduct()" class="product-form">
        <div class="form-group">
          <label>Título *</label>
          <input
            type="text"
            formControlName="title"
            placeholder="Nombre del producto"
            [class.error]="title?.invalid && title?.touched">

          @if (title?.invalid && title?.touched) {
            @if (title?.hasError('required')) {
              <span class="error-message">El título es requerido</span>
            }
            @if (title?.hasError('minlength')) {
              <span class="error-message">Mínimo 3 caracteres</span>
            }
          }
        </div>

        <div class="form-group">
          <label>Precio *</label>
          <input
            type="number"
            formControlName="price"
            placeholder="0.00"
            step="0.01"
            [class.error]="price?.invalid && price?.touched">

          @if (price?.invalid && price?.touched) {
            @if (price?.hasError('required')) {
              <span class="error-message">El precio es requerido</span>
            }
          }
        </div>

        <div class="form-group">
          <label>Categoría *</label>
          <select
            formControlName="category"
            [class.error]="category?.invalid && category?.touched">
            <option value="">Seleccionar categoría</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>

          @if (category?.invalid && category?.touched) {
            <span class="error-message">Seleccione una categoría</span>
          }
        </div>

        <div class="form-group">
          <label>Descripción *</label>
          <textarea
            formControlName="description"
            placeholder="Descripción del producto"
            rows="5"
            [class.error]="description?.invalid && description?.touched">
          </textarea>

          @if (description?.invalid && description?.touched) {
            @if (description?.hasError('required')) {
              <span class="error-message">La descripción es requerida</span>
            }
          }
        </div>

        <div class="form-group">
          <label>URL de la imagen *</label>
          <input
            type="text"
            formControlName="image"
            placeholder="https://ejemplo.com/imagen.jpg"
            [class.error]="image?.invalid && image?.touched">

          @if (image?.invalid && image?.touched) {
            @if (image?.hasError('required')) {
              <span class="error-message">La URL de la imagen es requerida</span>
            }
          }

          @if (image?.valid && image?.value) {
            <div class="image-preview">
              <img [src]="getSafeImageUrl()" alt="Preview">
            </div>
          }
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="goBack()">
            Cancelar
          </button>
          <button type="submit" class="btn-primary" [disabled]="productForm.invalid">
            Crear Producto
          </button>
        </div>
      </form>
    </div>
  `
})
export class ProductCreateComponent {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  productForm: FormGroup;

  constructor() {
    this.productForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      price: ['', [
        Validators.required
      ]],
      category: ['', Validators.required],
      description: ['', [
        Validators.required
      ]],
      image: ['', [
        Validators.required
      ]]
    });
  }

  get title() { return this.productForm.get('title'); }
  get price() { return this.productForm.get('price'); }
  get category() { return this.productForm.get('category'); }
  get description() { return this.productForm.get('description'); }
  get image() { return this.productForm.get('image'); }

  getSafeImageUrl(): SafeUrl {
    const imageUrl = this.image?.value || '';
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  createProduct() {
    if (this.productForm.valid) {
      this.error.set(null);
      this.successMessage.set(null);

      const newProduct: CreateProductDto = {
        title: this.productForm.value.title,
        price: parseFloat(this.productForm.value.price),
        category: this.productForm.value.category,
        description: this.productForm.value.description,
        image: this.productForm.value.image
      };

      this.productService.createProduct(newProduct).subscribe({
        next: (createdProduct) => {
          this.successMessage.set(`Producto "${createdProduct.title}" creado exitosamente`);
          this.productForm.reset();

          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 2000);
        },
        error: (err) => {
          this.error.set(err.message);
        }
      });
    } else {
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
