import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getProjectAsAttrValue } from '@angular/core/src/render3/node_selector_matcher';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  productsCategoryDict = {};
  productsCategories: any[] = [];
  selectedProductsCategory: {} = {};

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this.products = data;
      this.getProductsCategoryDict(this.products);
      console.log('products list: ', this.products);
    });
  }

  ngOnInit() {
  }

  public getJSON(): Observable<any> {
    return this.http.get('../../assets/data/products.json');
  }

  private getProductsCategoryDict(products: any[]): void {
    for (const product of products) {
      product.imageURL = 'https://www.utc.fr/~phamcong/products-images/' + product.image + '.jpeg';
      const category = product['category'];
      if (this.productsCategoryDict[category] === undefined) { this.productsCategoryDict[category] = []; }
      this.productsCategoryDict[category].push(product);
    }
    for (const key of Object.keys(this.productsCategoryDict)) {
      this.productsCategories.push({
        'name': key,
        'quantity': this.productsCategoryDict[key].length,
        'products': this.productsCategoryDict[key],
        'isSelected': false
      });
    }
    this.selectedProductsCategory = this.productsCategories[0];
    this.selectedProductsCategory['isSelected'] = true;
  }

  private selectCategory(item: any): void {
    this.selectedProductsCategory['isSelected'] = false;
    item.isSelected = true;
    this.selectedProductsCategory = item;
  }
}
