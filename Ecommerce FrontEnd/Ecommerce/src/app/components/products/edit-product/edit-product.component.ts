import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  product: any = { id: '', name: '', price: '' };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(parseInt(id)).subscribe((data:any) => {
        this.product = data;
      });
    }
  }

  updateProduct() {
    console.log("update called")
    this.productService
      .updateProduct(this.product.product_id, this.product)
      .subscribe(() => {
        alert('Product updated successfully!');
        this.router.navigate(['/products']);
      });
  }
}
