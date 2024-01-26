import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-orders',
  templateUrl: './get-orders.component.html',
  styleUrls: ['./get-orders.component.css']
})
export class GetOrdersComponent {

  constructor(private httpClient: HttpClient, private form:FormBuilder){}
  response:any;
  totalOrder:any;
  recievedOrders:any = [];
  processingOrders:any = [];
  completedOrders:any = [];
  loginSuccess = false;
  isFetching = false
  displayStyle = 'none'
  currentElementToDelete: any;
  role: any;
  filter = {}
  public getOrderCompForm!: FormGroup;

  status = [
    { id: 1, label: "All Orders"},
    { id: 2, label: "Recieved" },
    { id: 3, label: "Processing" },
    { id: 4, label: "Completed"},  
]

  ngOnInit(){
    this.buildForm();
    
  }


  buildForm(){
    this.getOrderCompForm = this.form.group({
      selectStatus: new FormControl('')
    })
  }

  postApiCall(): Observable<any[]>{
    console.log('api called')
    var credentials = localStorage.getItem('cred');
    var credObj = credentials != null ? JSON.parse(credentials) : null;
    console.log('credentials :: ',credObj);
    var manager = credObj.manager;
    var category = credObj.category;
    if(manager='admin')
    return  this.httpClient.get<any[]>('https://setu-crm.onrender.com/allOrders',{
      headers:
          new HttpHeaders(
            {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            }
          )
    })
    else
    return  this.httpClient.get<any[]>('https://setu-crm.onrender.com/test/'+category+'/'+manager,{
      headers:
          new HttpHeaders(
            {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            }
          )
    })
  }

  // sortOrdersByStatus(response: any){
  //   for(var i=0;i<response.length;i++){

  //     if(response[i].status.toString()=='Recieved'){
  //       this.recievedOrders.push(response[i])
  //     }
  //     if(response[i].status.toString()=="Processing"){
  //       this.processingOrders.push(response[i])
  //     }
  //     if(response[i].status.toString()=='Completed'){
  //       this.completedOrders.push(response[i])
  //     }
  //   }
  //   console.log('recieved orders :: ',this.recievedOrders);
  //   console.log('processing orders :: ',this.processingOrders);
  //   console.log('completed orders :: ',this.completedOrders);

  // }

  onSelectStatusChange(event:any){
    this.isFetching = true;
    var response = this.postApiCall().subscribe((res) => {
      this.isFetching = false;
      this.totalOrder = res
      console.log('data from subscribe :: ',res)
      if(this.totalOrder!=undefined && this.totalOrder!=null){
        console.log('value from select is :: ', event.value.selectStatus)
        var selectedOption = event.value.selectStatus
        if(selectedOption == 'Recieved'){
          this.response = this.sortResponseByStatus(this.totalOrder,'Recieved');
        }
        if(selectedOption == 'Processing'){
          this.response = this.sortResponseByStatus(this.totalOrder,'Processing');
        }
        if(selectedOption == 'Completed'){
          this.response = this.sortResponseByStatus(this.totalOrder,'Completed');
        }
        if(selectedOption == 'All Orders'){
          this.response = this.totalOrder
        }
        }
    }) 
  }

  sortResponseByStatus(arr: any,param: string){
    var out = []
    console.log('data :: ',arr);
    for(var i=0;i<arr.length;i++){
      console.log('data :: ',arr[i].status);
      if(arr[i].status?.toString()==param){
        out.push(arr[i]);
      } 
    }
    return out;
  }

  //function for search response
  //  createFilterForResponse(form: any){
  //    this.postApiCall().subscribe(data => {
  //     this.totalOrder = data
  //     if(this.response != null && this.response != undefined && this.response.length != 0){
  //       var cred = JSON.parse(localStorage.getItem('cred') || '{}');
  //       if(cred != null || cred != undefined){
  //         this.role = cred.role;
  //       }
        
  //       //this.sortOrdersByStatus(this.response);
  //     }
  //     console.log('response data from api :: ',data);
  //   })
  //   this.filter={
  //     status: form.value.selectStatus,
  //     productCategory: this.role
  //   }
  //   this.searchResponseOnCreatedFilter(this.filter);
  // }

  // searchResponseOnCreatedFilter(criteria: any){
  //   console.log('Filter criteria :: ',criteria)
  //   var result = this.totalOrder;
  //   console.log('result at 116 :: ',result);
  //   result = result.filter((row: { [x: string]: { toString: () => string; }; }) => {
  //     return Object.keys(criteria).every(propertyName => row[propertyName].toString().toLowerCase().indexOf(criteria[propertyName].toString().toLowerCase()) > -1);
  //   })
  //   this.response = result;
  // console.log('filtered data :: ', result)
  // }

  deleteOrder(order:any){
    console.log('delete api called ')
    this.deleteApiCall(order).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data))
      console.log('data',res.status)
      if(res.status == '200'){
          console.log('deleted',res);
          this.removeElemntAfterDelete(this.response,order);
      }
    })
  }

  deleteApiCall(data: any){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(data);
    console.log(body)
    return this.httpClient.post('https://setu-crm.onrender.com/deleteOrder', body,{'headers':headers})
  }

  removeElemntAfterDelete(arr: any, res:any){
    var index=-1;
    for(var i=0;i<arr.length;i++){
      if(arr[i].id == res.id){
        console.log('match found')
        index = i;
      }
    }
    if(index!=-1){
      this.response.splice(index, 1);
    }
  }

  openPopup(order: any) {
    this.displayStyle = "block";
    this.currentElementToDelete = order;
  }
  deleteFromPopup() {
    this.displayStyle = "none";
    if(this.currentElementToDelete != undefined && this.currentElementToDelete != null)
    this.deleteOrder(this.currentElementToDelete);
  }
  closePopup(){
    this.displayStyle = 'none'
  }
}
