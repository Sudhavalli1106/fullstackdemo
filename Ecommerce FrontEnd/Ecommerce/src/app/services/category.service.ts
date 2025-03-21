import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl :string=""
  constructor(private http: HttpClient,private apiOb:ApiConfigService) {
     this.apiUrl = apiOb.getBaseUrl() +"/category";
     //console.log("api url =", this.apiUrl +"/category")
   }

  getCategories(): Observable<Category[]> {
   // console.log(this.apiUrl)
    return this.http.get<Category[]>(this.apiUrl);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
