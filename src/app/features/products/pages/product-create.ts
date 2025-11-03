import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductValidator } from '../validator/product.validator';
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
            @if (title?.hasError('invalidTitle')) {
              <span class="error-message">{{ title?.errors?.['invalidTitle'].message }}</span>
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
            @if (price?.hasError('invalidPrice')) {
              <span class="error-message">{{ price?.errors?.['invalidPrice'].message }}</span>
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
            @if (description?.hasError('shortDescription')) {
              <span class="error-message">{{ description?.errors?.['shortDescription'].message }}</span>
            }
            @if (description?.hasError('longDescription')) {
              <span class="error-message">{{ description?.errors?.['longDescription'].message }}</span>
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
            @if (image?.hasError('invalidImageUrl')) {
              <span class="error-message">{{ image?.errors?.['invalidImageUrl'].message }}</span>
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
  `,
  styles: [`
    .create-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .header {
      margin-bottom: 2rem;
    }

    .header h2 {
      margin: 0;
      color: #333;
    }

    .success-box {
      background-color: #e8f5e9;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid #4caf50;
      color: #2e7d32;
      margin-bottom: 2rem;
    }

    .error-box {
      background-color: #ffebee;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid #f44336;
      color: #c62828;
      margin-bottom: 2rem;
    }

    .product-form {
      background-color: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    input, select, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;
      transition: border-color 0.3s;
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #1976d2;
    }

    input.error, select.error, textarea.error {
      border-color: #f44336;
    }

    .error-message {
      display: block;
      color: #f44336;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .image-preview {
      margin-top: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 1rem;
      text-align: center;
    }

    .image-preview img {
      max-width: 200px;
      max-height: 200px;
      object-fit: contain;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn-primary, .btn-secondary {
      flex: 1;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s;
    }

    .btn-primary {
      background-color: #1976d2;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #1565c0;
    }

    .btn-primary:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .btn-secondary {
      background-color: white;
      color: #1976d2;
      border: 2px solid #1976d2;
    }

    .btn-secondary:hover {
      background-color: #e3f2fd;
    }
  `]
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
        Validators.minLength(3),
        ProductValidator.titleValidator()
      ]],
      price: ['', [
        Validators.required,
        ProductValidator.priceValidator()
      ]],
      category: ['', Validators.required],
      description: ['', [
        Validators.required,
        ProductValidator.descriptionValidator()
      ]],
      image: ['', [
        Validators.required,
        ProductValidator.imageUrlValidator()
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
