import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products?: Product[];
  currentProduct: Product = {};
  currentIndex = -1;
  title = '';
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.retrieveProduct();
  }
  retrieveProduct(): void {
    this.productService.getAll()
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveProduct();
    this.currentProduct = {};
    this.currentIndex = -1;
  }
  setActiveProduct(products: Product, index: number): void {
    this.currentProduct = products;
    this.currentIndex = index;
  }
  removeAllProduct(): void {
    this.productService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  searchTitle(): void {
    this.currentProduct = {};
    this.currentIndex = -1;
    this.productService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}