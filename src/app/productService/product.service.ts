import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  Baseurl="https://ecartserver-52kl.onrender.com "

  // create behaviour subject

  searchString=new BehaviorSubject("")

  cartCount=new BehaviorSubject(0)
  
  constructor(private http:HttpClient) { 
    this.updateCartCount()
  }

  updateCartCount(){
    this.getCart().subscribe({
      next:(result:any)=>{
        this.cartCount.next(result.length)
      }
    })
  }

  // api call

  getProducts(searchData:any){
    return this.http.get(`${this.Baseurl}/get-all-products?search=${searchData}`)
  }

  getsingleProduct(id:any){
    return this.http.get(`${this.Baseurl}/get-single-product/${id}`)

  }

  signup(bodyData:any){
  return this.http.post(`${this.Baseurl}/add-new-user`,bodyData)
  }

  login(bodyData:any){
    return this.http.post(`${this.Baseurl}/login`,bodyData)
  }

  accessTokenHeader(){
    // create header
    var headers=new HttpHeaders()

    // check whether the token is present in local storage

    if(localStorage.getItem("token")){
      // store token in a variable
      const token=localStorage.getItem("token")

      var headers=headers.append("access_token",`Bearer ${token}`) //variable name should be same overloaded variable
    }
    return {headers} //should return as obj
  }

  addToWishlist(bodyData:any){
    return this.http.post(`${this.Baseurl}/user/add-to-wishlist`,bodyData,this.accessTokenHeader())
  }

  getWishlist(userId:any){
    return this.http.get(`${this.Baseurl}/user/get-wishlist/${userId}`,this.accessTokenHeader())
  }

  removeWishlist(_id:any){
    return this.http.delete(`${this.Baseurl}/user/remove-wishlist/${_id}`,this.accessTokenHeader())
  }

  addToCart(bodyData:any){
    return this.http.post(`${this.Baseurl}/user/add-to-cart`,bodyData,this.accessTokenHeader())
  }

  getCart(){
    return this.http.get(`${this.Baseurl}/user/get-cart`,this.accessTokenHeader())
  }

  removeCart(_id:any){
    return this.http.delete(`${this.Baseurl}/user/remove-cart/${_id}`,this.accessTokenHeader())
  }

  incrementCount(_id:any){
    return this.http.get(`${this.Baseurl}/user/increment-cart/${_id}`,this.accessTokenHeader())
  }

  decrementCount(_id:any){
    return this.http.get(`${this.Baseurl}/user/decrement-cart/${_id}`,this.accessTokenHeader())
  }

  emptyCart(){
    return this.http.delete(`${this.Baseurl}/user/empty-cart`,this.accessTokenHeader())
  }

}
