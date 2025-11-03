import { Component, signal, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  template: `
    <div class="product-detail-container">
      <button class="btn-back" (click)="goBack()">
        Volver a la lista
      </button>

      @if (error()) {
        <div class="error-box">
          <p>{{ error() }}</p>
          <button (click)="loadProduct()">Reintentar</button>
        </div>
      }

      @if (product()) {
        <div class="product-detail">
          <div class="product-image">
            <img [src]="product()!.image" [alt]="product()!.title">
          </div>

          <div class="product-info">
            <span class="category">{{ product()!.category }}</span>
            <h1>{{ product()!.title }}</h1>

            <div class="rating">
              <span class="stars">⭐ {{ product()!.rating.rate }}</span>
              <span class="count">({{ product()!.rating.count }} valoraciones)</span>
            </div>

            <p class="price">\${{ product()!.price }}</p>

            <div class="description">
              <h3>Descripción</h3>
              <p>{{ product()!.description }}</p>
            </div>

            <div class="actions">
              <button class="btn-primary">Agregar al carrito</button>
              <button class="btn-secondary">Favoritos</button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .product-detail-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .btn-back {
      background-color: #f5f5f5;
      color: #333;
      padding: 0.75rem 1.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 2rem;
      font-size: 1rem;
    }

    .btn-back:hover {
      background-color: #e0e0e0;
    }

    .product-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      background-color: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .product-image {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .product-image img {
      max-width: 100%;
      max-height: 500px;
      object-fit: contain;
    }

    .product-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .category {
      display: inline-block;
      background-color: #e3f2fd;
      color: #1976d2;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.875rem;
      text-transform: capitalize;
      width: fit-content;
    }

    h1 {
      margin: 0;
      color: #333;
      font-size: 2rem;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stars {
      color: #f57c00;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .count {
      color: #666;
    }

    .price {
      font-size: 2.5rem;
      font-weight: bold;
      color: #1976d2;
      margin: 1rem 0;
    }

    .description {
      margin-top: 1rem;
    }

    .description h3 {
      color: #333;
      margin-bottom: 0.5rem;
    }

    .description p {
      color: #666;
      line-height: 1.6;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn-primary, .btn-secondary {
      flex: 1;
      padding: 1rem;
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

    .btn-primary:hover {
      background-color: #1565c0;
    }

    .btn-secondary {
      background-color: white;
      color: #1976d2;
      border: 2px solid #1976d2;
    }

    .btn-secondary:hover {
      background-color: #e3f2fd;
    }

    .error-box {
      background-color: #ffebee;
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid #f44336;
      color: #c62828;
    }

    .error-box button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .product-detail {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  product = signal<Product | null>(null);
  error = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadProduct(+id);
    }
  }

  loadProduct(id?: number) {
    const productId = id || +this.route.snapshot.params['id'];
    this.error.set(null);

    this.productService.getProductById(productId).subscribe({
      next: (data) => {
        this.product.set(data);
      },
      error: (err) => {
        this.error.set(err.message);
      }
    });
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
