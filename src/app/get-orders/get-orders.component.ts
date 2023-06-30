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
  totalOrder:any;
  recievedOrders:any = [];
  processingOrders:any = [];
  completedOrders:any = [];

  status = [
    { id: 1, label: "Recieved" },
    { id: 2, label: "Processing" },
    { id: 3, label: "Completed"},
    { id: 4, label: "All Orders"}
]

  ngOnInit(){
    this.postApiCall().subscribe(data => {
      this.response = data
      this.totalOrder = this.response
      if(this.response != null && this.response != undefined && this.response.length != 0){
        this.sortOrdersByStatus(this.response);
      }
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

  sortOrdersByStatus(response: any){
    for(var i=0;i<response.length;i++){

      if(response[i].status.toString()=='Recieved'){
        this.recievedOrders.push(response[i])
      }
      if(response[i].status.toString()=="Processing"){
        this.processingOrders.push(response[i])
      }
      if(response[i].status.toString()=='Completed'){
        this.completedOrders.push(response[i])
      }
    }
    console.log('recieved orders :: ',this.recievedOrders);
    console.log('processing orders :: ',this.processingOrders);
    console.log('completed orders :: ',this.completedOrders);

  }

  onSelectStatusChange(event:any){
    console.log('value from select is :: ',event.target.value)
    var selectedOption = event.target.value
    if(selectedOption == 'Recieved'){
      this.response = this.recievedOrders;
    }
    if(selectedOption == 'Processing'){
      this.response = this.processingOrders;
    }
    if(selectedOption == 'Completed'){
      this.response = this.completedOrders;
    }
    if(selectedOption == 'All Orders'){
      this.response = this.totalOrder
    }
  }

  deleteOrder(order:any){
    this.deleteApiCall(order).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data))
      console.log('data',res.status)
      if(res.status == '200'){
          console.log('deleted',res);
      }
    })
  }

  deleteApiCall(data: any){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(data);
    console.log(body)
    return this.httpClient.post('http://localhost:8080/deleteOrder', body,{'headers':headers})
  }
}
