import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  template: `
    <div class="product-list-container">
      <div class="header">
        <h2>Lista de Productos</h2>
        <button class="btn-primary" (click)="goToCreate()">
          Crear Producto
        </button>
      </div>

      @if (error()) {
        <div class="error-box">
          <p>{{ error() }}</p>
          <button (click)="loadProducts()">Reintentar</button>
        </div>
      }

      <div class="stats">
        <p><strong>Total de productos:</strong> {{ productService.products().length }}</p>
      </div>

      <div class="products-grid">
        @for (product of productService.products(); track product.id) {
          <div class="product-card" (click)="goToDetail(product.id)">
            <img [src]="product.image" [alt]="product.title">
            <div class="product-info">
              <h3>{{ product.title }}</h3>
              <p class="category">{{ product.category }}</p>
              <p class="price">\${{ product.price }}</p>
              <div class="rating">
                ⭐ {{ product.rating.rate }} ({{ product.rating.count }} reviews)
              </div>
            </div>
          </div>
        } @empty {
          <p class="empty-message">No hay productos disponibles</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .product-list-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header h2 {
      margin: 0;
      color: #333;
    }

    .btn-primary {
      background-color: #1976d2;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s;
    }

    .btn-primary:hover {
      background-color: #1565c0;
    }

    .stats {
      background-color: #e3f2fd;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }

    .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1.5rem;
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
      background-color: white;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .product-card img {
      width: 100%;
      height: 200px;
      object-fit: contain;
      margin-bottom: 1rem;
    }

    .product-info h3 {
      font-size: 1rem;
      margin: 0 0 0.5rem 0;
      color: #333;
      height: 3rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .category {
      color: #666;
      font-size: 0.875rem;
      text-transform: capitalize;
      margin: 0.5rem 0;
    }

    .price {
      font-size: 1.5rem;
      font-weight: bold;
      color: #1976d2;
      margin: 0.5rem 0;
    }

    .rating {
      color: #f57c00;
      font-size: 0.875rem;
    }

    .error-box {
      background-color: #ffebee;
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid #f44336;
      color: #c62828;
      margin-bottom: 2rem;
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

    .empty-message {
      text-align: center;
      color: #999;
      font-size: 1.2rem;
      padding: 3rem;
      grid-column: 1 / -1;
    }
  `]
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  private router = inject(Router);

  error = signal<string | null>(null);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.error.set(null);

    this.productService.getAllProducts().subscribe({
      error: (err) => {
        this.error.set(err.message);
      }
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/products', id]);
  }

  goToCreate() {
    this.router.navigate(['/products/create']);
  }
}
