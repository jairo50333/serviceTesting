import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  constructor(private productService: ProductsService) { }


  ngOnInit(): void {
    this.getAllPodructs();
  }

  products: Product[] = [];

  getAllPodructs() {
    this.productService.getAllSimple().subscribe(products => {
      this.products = products;
    })
  }

}
