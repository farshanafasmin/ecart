import { Component, OnInit } from '@angular/core';
import { ProductService } from '../productService/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  products: any = []

  totalPrice:any=0

  constructor(private ps:ProductService, private route:Router){}

  ngOnInit(): void {
  
   this.cartItems()
  }

  cartItems(){
    this.ps.getCart().subscribe({
      next: (result: any) => {
        this.products = result
        console.log(this.products);
        this.getTotalPrice()
      }
    })
  }

  removeCart(id: any) {
    this.ps.removeCart(id).subscribe({
      next: (result: any) => {
        // alert(result)

        // refresh cart
        this.cartItems()
        this.ps.updateCartCount()
        
      },
      error: (result: any) => {
        alert(result.error)
      }

    })
  }

  getTotalPrice(){
    if(this.products.length>0){
      this.totalPrice=Math.ceil(this.products.map((i:any)=>i.grandTotal).reduce((a:any,b:any)=>a+b))
      localStorage.setItem("total",this.totalPrice)
      console.log(this.totalPrice);
      
    }
  }

  incrementCount(id:any){

    this.ps.incrementCount(id).subscribe({
      next:(result:any)=>{
        alert(result)
        this.cartItems()

      },
      error:(result:any)=>{
        alert(result.error)
      }
    })
  }

  decrementCount(id:any){
    this.ps.decrementCount(id).subscribe({
      next:(result:any)=>{
        alert(result)
        this.cartItems()
        this.ps.updateCartCount()

      },
      error:(result:any)=>{
        alert(result.error)
      }
    })
  }

  checkOut(){
    localStorage.setItem("total",this.totalPrice)
    this.route.navigateByUrl("/checkout")
  }
}
