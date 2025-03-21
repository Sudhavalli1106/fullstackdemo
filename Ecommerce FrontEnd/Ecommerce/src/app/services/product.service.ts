import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
 private apiUrl = "";     
 //= 'http://localhost:3000/api/products'; // Backend API URL

  constructor(private http: HttpClient,private apiOb:ApiConfigService) {
    this.apiUrl = apiOb.getBaseUrl() + "/products";
    console.log("api url =", this.apiUrl)
  }

  // Fetch all products
  getProducts(): Observable<any> {
    debugger
    console.log("url in getproducts()",this.apiUrl)
    return this.http.get(this.apiUrl );
  }

  // Fetch product by ID
  getProductById(id: number): Observable<any> {
    debugger
    console.log(id)
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Add a new product
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, product);
  }

  // Update product
  updateProduct(id: number, product: any): Observable<any> {
    console.log("in service" ,id)
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  // Delete product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
