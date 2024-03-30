import { Component, OnInit } from '@angular/core';
import { ProductService } from '../productService/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  userId: any = ''

  products: any = []

 

  constructor(private ps: ProductService, private route:Router) { }

  ngOnInit(): void {

    if (localStorage.getItem("currentUserId")) {
      this.userId = localStorage.getItem("currentUserId")
      this.getWishlistdata()

    }

  }
  getWishlistdata() {
    this.ps.getWishlist(this.userId).subscribe({
      next: (result: any) => {
        this.products = result
        console.log(this.products);
      }
    })
  }

  removeWishlist(id: any) {
    this.ps.removeWishlist(id).subscribe({
      next: (result: any) => {
        // alert(result)

        // refresh wishlist
        this.getWishlistdata()
      },
      error: (result: any) => {
        alert(result.error)
      }

    })
  }

  addToCart(product: any) {

      Object.assign(product, { quantity: 1 })
      console.log(product);
      this.ps.addToCart(product).subscribe({
        next: (result: any) => {
          this.ps.updateCartCount()
         this.removeWishlist(product._id)
          alert(result)
        },
        error: (result: any) => {
          alert(result.error)
        }
      })

    }
  }







