import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ProductService } from '../productService/product.service';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  buyStatus: any = false

  totalPrice: any = 0

  constructor(private fb: FormBuilder, private route: Router, private ps:ProductService) { }



  ngOnInit(): void {

    if (localStorage.getItem("total")) {
      this.totalPrice = localStorage.getItem("total")
    }

  }



  checkoutModel = this.fb.group({
    name: [''],
    location: [''],
    landmark: [''],
    pincode: [''],
    mobile: ['']

  })

  cancel() {
    this.route.navigateByUrl('/cart')
  }

  proceedToBuy() {
    this.buyStatus = true
  }

  cancelPayment() {
    this.buyStatus = false
    
  }

  payment() {
    this.initConfig();
  }



  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.totalPrice,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.totalPrice
              }
            }
          }
        
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details:any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      
        alert("payment successful")
        // redirect to home
        // empty cart

        this.ps.emptyCart().subscribe({
          next:(result:any)=>{
            alert(result)
          },error:(result:any)=>{
            alert(result.error)
          }
        })

        this.route.navigateByUrl("")

       
        // cartcount update
        this.ps.updateCartCount()

      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        alert('transaction has been cancelled')

      },
      onError: err => {
        console.log('OnError', err);
        alert("transaction failed....try after some timex")
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }
}


