import { Component, OnInit } from '@angular/core';
import { ProductService } from '../productService/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-singleview',
  templateUrl: './singleview.component.html',
  styleUrls: ['./singleview.component.css']
})
export class SingleviewComponent implements OnInit{

  singleProduct:any={}

  id:any=''

  constructor(private ps:ProductService,private ar:ActivatedRoute, private route:Router){}

  ngOnInit(): void {

    this.ar.params.subscribe((data:any)=>{
      this.id=data.id
    })

    this.ps.getsingleProduct(this.id).subscribe({
      next:(result:any)=>{
        
        this.singleProduct=result
        console.log(this.singleProduct);
        
      },error:(result:any)=>{
        alert(result.error.message)
        
      }
    })
    
  }

  addToCart(product: any) {

    if (localStorage.getItem("currentUserId")) {
      // alert('Item added to cart')

      // add quantity=1 in product object
      // to update object use .assign method

      Object.assign(product, { quantity: 1 })
      console.log(product);
      this.ps.addToCart(product).subscribe({
        next: (result: any) => {
          this.ps.updateCartCount()
          alert(result)
          this.route.navigateByUrl("cart")
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

  addToWishlist(id: any, title: any, price: any, description: any, category: any, image: any, rating: any) {
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
    
    else {
      alert("Please log in first")
      this.route.navigateByUrl("login")
    }

  }
}
