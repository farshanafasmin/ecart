import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../productService/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private ps: ProductService, private route:Router) { }

  signupModel = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]

  })

  ngOnInit(): void {

  }

  signup() {
    if (this.signupModel.valid) {
      var path = this.signupModel.value
      var userData = {
        username: path.username,
        email: path.email,
        password: path.password
      }
      console.log(userData);

      this.ps.signup(userData).subscribe({
        next: (result: any) => {
          console.log(result);

          alert(`${result.username} registered successfully...`);
          this.route.navigateByUrl('/login')
          this.signupModel.reset()

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
