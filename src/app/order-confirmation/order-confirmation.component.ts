import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
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
  model = new User();
  Hobbies: string[] = [
    'Acrobatics',
    'Acting',
    'Animation',
    'Astronomy',
    'Baking',
  ];
  onSubmit(form: any) {
    var currentTime = new Date();
    var response = {
      id: currentTime,
      orderName: form.value.orderName,
      orderDescription: form.value.orderDescription
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
