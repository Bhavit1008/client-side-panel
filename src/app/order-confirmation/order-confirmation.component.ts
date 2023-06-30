import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { NewOrders } from '../models/NewOrders';
import { Router } from '@angular/router';
import { RunningOrder } from '../models/RunningOrder';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

  constructor(private httpClient: HttpClient,private router:Router,private route:ActivatedRoute,private form:FormBuilder) { }
  
  //Declarations
  isRunningOrder=false;
  isNewOrder=true;
  isOrderConfirmed = false
  isSubmitted = false
  confirmedOrderDetails: any;
  dataForEdit: any;
  public orderCompForm!: FormGroup;
  currentId: string='';

  model = new NewOrders('','','','','','','','','','','','','','','','','','','');
  runningOrderModel = new RunningOrder('','','','','','','','','','');

  responseObj: any = {
    id: '',
    productCategory: '',
    partyName: '',
    deliveryCity: '',
    productCode: '',
    productDescription: '',
    size: '',
    quantity: '',
    quality: '',
    polish: '',
    shape: '',
    deliveryDate: '',
    color: '',
    creationDate: '',
    primaryManager: 'primary manger',
    secondaryManager: '',
    dispatchedQuantity: '',
    leftQuantity: '',
    status: ''
  }
  
  status = [
    { id: 1, label: "Recieved" },
    { id: 2, label: "Processing" },
    { id: 3, label: "Completed"}
]
  productCategories = [
    { id: 1, label: "Handicraft" },
    { id: 2, label: "slabs" },
    { id: 3, label: "Bote"}
]

//oninit
ngOnInit(): void {
  this.buildForm()
  var data = this.route.params.subscribe(params => {
      this.dataForEdit = params
    });
    console.log('Data from get page for edit :: ',this.dataForEdit);
    if(this.dataForEdit!=null && this.dataForEdit!= undefined && Object.keys(this.dataForEdit).length !== 0){
      console.log('dataForEdit is not empty');
      this.setEditValues(this.dataForEdit);
    }
}

get f(){return this.orderCompForm.controls;}

//Build/initialize new form controller
buildForm(){
  this.orderCompForm = this.form.group({
    productCategory: new FormControl(''),
    partyName: new FormControl(''),
    deliveryCity: new FormControl(''),
    productCode: new FormControl(''),
    productDescription: new FormControl(''),
    size: new FormControl(''),
    quantity: new FormControl(''),
    quality: new FormControl(''),
    polish: new FormControl(''),
    shape: new FormControl(''),
    deliveryDate: new FormControl(''),
    color: new FormControl(''),
    creationDate: new FormControl(''),
    primaryManager: new FormControl(''),
    secondaryManager: new FormControl(''),
    dispatchedQuantity: new FormControl(''),
    leftQuantity: new FormControl(''),
    status: new FormControl('')
  })
  this.orderCompForm.get('productCategory')!.setValue('Handicraft');
  this.orderCompForm.get('status')?.setValue('Recieved');
}

//set values for edit page
setEditValues(data: any){
  console.log('setEditValues is called');
  this.currentId = data.id;
  this.orderCompForm.get('productCategory')!.setValue(data.productCategory);
  this.orderCompForm.get('partyName')?.setValue(data.partyName);
  this.orderCompForm.get('deliveryCity')?.setValue(data.deliveryCity);
  this.orderCompForm.get('productCode')?.setValue(data.productCode);
  this.orderCompForm.get('productDescription')?.setValue(data.productDescription);
  this.orderCompForm.get('size')?.setValue(data.size);
  this.orderCompForm.get('quantity')?.setValue(data.quantity);
  this.orderCompForm.get('quality')?.setValue(data.quality);
  this.orderCompForm.get('polish')?.setValue(data.polish);
  this.orderCompForm.get('shape')?.setValue(data.shape);
  this.orderCompForm.get('deliveryDate')?.setValue(data.deliveryDate);
  this.orderCompForm.get('color')?.setValue(data.color);
  this.orderCompForm.get('creationDate')?.setValue(data.creationDate);
  this.orderCompForm.get('primaryManager')?.setValue(data.primaryManager);
  this.orderCompForm.get('secondaryManager')?.setValue(data.secondaryManager);
  this.orderCompForm.get('dispatchedQuantity')?.setValue(data.dispatchedQuantity);
  this.orderCompForm.get('leftQuantity')?.setValue(data.leftQuantity);
  this.orderCompForm.get('status')?.setValue(data.status);
  this.responseObj = data;
}

//prepare response object for new order confirmation
prepareResForNewOrder(form: any){
  var currentTime = new Date();
  this.currentId = currentTime.toString();
  this.responseObj = {
    id: currentTime.toString(),
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
    secondaryManager: form.value.secondaryManager,
    dispatchedQuantity: '',
    leftQuantity: '',
    status: 'Recieved'
  }
}

//Save data for new order confirmation
saveNewOrder(form: any){
  this.prepareResForNewOrder(form);
  console.log('responseObj for new order form :: ',this.responseObj);
  this.postApiCall(this.responseObj).subscribe(data => {
    let res = JSON.parse(JSON.stringify(data))
    console.log('data',res.status)
    if(res.status == '200'){
        console.log('success',res);
    }
  }) 
}


//prepare response object for running order confirmation
prepareResForRunningOrder(form: any){
  console.log('data for running order :: ',form.value.dispatchedQuantity )
  var currentTime = new Date();
  console.log('form.value.productCategory :: ',form.value.productCategory)
  console.log('current id:: ', this.currentId);
  this.responseObj = {
    id: this.currentId,
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
    secondaryManager: form.value.secondaryManager,
    dispatchedQuantity: form.value.dispatchedQuantity,
    leftQuantity: form.value.leftQuantity,
    status: form.value.status
  }
}


//Save data for new order confirmation
saveRunningOrder(form: any){
  this.prepareResForRunningOrder(form);
  console.log('responseObj for running order form :: ',this.responseObj);
  this.postApiCall(this.responseObj).subscribe(data => {
    let res = JSON.parse(JSON.stringify(data))
    console.log('data',res.status)
    if(res.status == '200'){
        console.log('success',res);
    }
  }) 
}
  

postApiCall(data: any){
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(data);
  console.log(body)
  return this.httpClient.post('http://localhost:8080/addOrder', body,{'headers':headers})
}

goToRunningOrderComp(){
  this.isRunningOrder = true;
  this.isNewOrder = false;
}

goToNewOrderComp(){
  this.isRunningOrder = false;
  this.isNewOrder = true;
}





}
