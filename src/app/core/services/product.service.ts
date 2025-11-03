import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { Product, CreateProductDto } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/products`;

  // Signals para ESTADO COMPARTIDO
  private _products = signal<Product[]>([]);
  products = this._products.asReadonly();

  // GET - Obtener todos los productos
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(data => this._products.set(data))
    );
  }

  // GET - Obtener un solo producto
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // POST - Crear nuevo producto
  createProduct(product: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(newProduct => {
        this._products.update(current => [...current, newProduct]);
      })
    );
  }
}
