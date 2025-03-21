import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  editProduct(product: any) {
    console.log(product)
    const newName = prompt('Enter new name:', product.name);
    const newPrice = prompt('Enter new price:', product.price);
    if (newName && newPrice) {
      const updatedProduct = {
        ...product,
        name: newName,
        price: parseFloat(newPrice),
      };
       console.log(updatedProduct);
      this.productService
        .updateProduct(product.product_id, updatedProduct)
       
        .subscribe(() => {
          this.getProducts(); // Refresh list
        });
    }
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.getProducts(); // Refresh list
      });
    }
  }
}
