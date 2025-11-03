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
  `
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
