import { Component, OnInit } from '@angular/core';
import { ProductService } from '../productService/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allProducts: any = []
  searchData = ""

  constructor(private ps: ProductService, private route: Router) { }

  ngOnInit(): void {

    this.ps.searchString.subscribe((data: any) => {
      this.searchData = data
      console.log(this.searchData);

      this.ps.getProducts(this.searchData).subscribe({
        next: (result: any) => {

          this.allProducts = result
          console.log(this.allProducts);

        }, error: (result: any) => {
          alert(result)
        }
      })
    })
  }

  isLoggedIn() {

    if (localStorage.getItem("currentUser")) {
      return true
    }
    else {
      return false
    }

  }

  addToCart(product: any) {

    if (this.isLoggedIn()) {
      // alert('Item added to cart')

      // add quantity=1 in product object
      // to update object use .assign method

      Object.assign(product, { quantity: 1 })
      console.log(product);
      this.ps.addToCart(product).subscribe({
        next: (result: any) => {
          this.ps.updateCartCount()
          alert(result)
        },
        error: (result: any) => {
          alert(result.error)
        }
      })

    }
    else {
      alert("Please log in first")
      this.route.navigateByUrl("login")
    }

  }

  addToWishlist(id: any, title: any, description: any, price: any, category: any, image: any, rating: any) {
    if (this.isLoggedIn()) {
      if (localStorage.getItem("currentUserId")) {
        var userId = localStorage.getItem("currentUserId")
        const bodyData = {
          userId, id, title, price, description, category, image, rating
        }
        this.ps.addToWishlist(bodyData).subscribe({

          next: (result: any) => {
            alert(result);
            this.route.navigateByUrl("wishlist")

          },
          error: (result: any) => {
            alert(result.error);

          }
        })


      }
    }
    else {
      alert("Please log in first")
      this.route.navigateByUrl("login")
    }

  }

}