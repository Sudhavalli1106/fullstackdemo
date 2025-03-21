import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  private baseUrl = environment.apiUrl ; // Using the environment variable

  constructor() {}

  getBaseUrl() {
    return `${this.baseUrl}`;
  }
}
