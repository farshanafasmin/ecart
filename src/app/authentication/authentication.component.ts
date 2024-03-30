import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../productService/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private fb: FormBuilder, private ps: ProductService, private route: Router) { }

  loginModel = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]

  })


  ngOnInit(): void {

  }

  login() {

    if (this.loginModel.valid) {
      var path = this.loginModel.value
      var loginData = {
        email: path.email,
        password: path.password
      }

      this.ps.login(loginData).subscribe({

        next: (result: any) => {
          console.log(result);

          alert(`${result.user.username} loginned successfully...`);
          this.route.navigateByUrl("")
          this.loginModel.reset()
          localStorage.setItem("currentUser", result.user.username)
          localStorage.setItem("currentUserId", result.user._id)
         

          // store token 
          localStorage.setItem("token", result.token)

          this.ps.updateCartCount()

        },
        error: (result: any) => {
          alert(result.error);

        }

      })

    }
    else {
      alert("invalid form")
    }

  }

}
