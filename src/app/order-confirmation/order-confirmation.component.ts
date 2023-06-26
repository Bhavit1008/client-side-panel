import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { NewOrders } from '../models/NewOrders';
export class User {
  public orderName!: string;
  public orderDescription!: string;
 
}
@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  model = new NewOrders('','','','','','','','','','','','','','','','');
  productCategories = [
    { id: 1, label: "Handicraft" },
    { id: 2, label: "slabs" },
    { id: 3, label: "Bote"}
]
  onSubmit(form: any) {
    var currentTime = new Date();
    var response = {
      id: currentTime,
      productCategory: form.value.productCategory,
      partyName: form.value.partyName,
      deliveryCity: form.value.deliveryCity,
      productCode: form.value.productCode,
      productDescription: form.value.productDescription,
      size: form.value.size,
      quantity: form.value.quantity,
      quality: form.value.quality,
      polish: form.value.polish,
      shape: form.value.shape,
      deliveryDate: form.value.deliveryDate,
      color: form.value.color,
      creationDate: currentTime,
      primaryManager: 'primary manger',
      secondaryManager: form.value.secondaryManager
    }
    this.postApiCall(response).subscribe(data => {
      console.log(data)
      
    })   
    console.log(response);
    
}

postApiCall(data: any){
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(data);
  console.log(body)
  return this.httpClient.post('http://localhost:8080/addOrder', body,{'headers':headers})
}

}
