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
  `
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
