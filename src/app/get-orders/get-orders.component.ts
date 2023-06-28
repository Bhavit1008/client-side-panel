import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-get-orders',
  templateUrl: './get-orders.component.html',
  styleUrls: ['./get-orders.component.css']
})
export class GetOrdersComponent {

  constructor(private httpClient: HttpClient){}
  response:any;
  ngOnInit(){
    this.postApiCall().subscribe(data => {
      this.response = data
      console.log('response :: ',this.response);
    })
    if(this.response!=null && this.response!=undefined){
      console.log('response :: ',this.response);
      console.log('length :: ',this.response.length());
    }
  }

  postApiCall(){
    return this.httpClient.get('http://localhost:8080/test')
  }

  
}
