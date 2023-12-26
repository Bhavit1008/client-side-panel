import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { NewOrders } from '../models/NewOrders';
import { Router } from '@angular/router';
import { RunningOrder } from '../models/RunningOrder';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, firstValueFrom } from 'rxjs';
import { async } from '@angular/core/testing';

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

  constructor(private httpClient: HttpClient,private router:Router,private route:ActivatedRoute,private form:FormBuilder) { 
    var response = this.getUsers().then((res) => {
      console.log('fetched response ::', res);
      this.users = res;
  });
  }
  
  //Declarations
  isRunningOrder=false;
  isNewOrder=true;
  isOrderConfirmed = false
  isSubmitted = false
  confirmedOrderDetails: any;
  dataForEdit: any;
  public orderCompForm!: FormGroup;
  currentId: string='';
  orderSuccessDialog = false
  orderFailureDialog = false
  currentD = new Date();
  model = new NewOrders('','','','','','','','','','','','','','','','','','','');
  runningOrderModel = new RunningOrder('','','','','','','','','','');
  users:any;

  responseObj: any = {
    id: '',
    productCategory: '',
    partyName: '',
    deliveryCity: '',
    productCode: '',
    productDescription: '',
    unit: '',
    length: '',
    width: '',
    height: '',
    quantity: '',
    quality: '',
    polish: '',
    shape: '',
    deliveryDate: '',
    color: '',
    creationDate: '',
    primaryManager: 'primary manger',
    secondaryManager: '',
    developedQuantity: '',
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
    { id: 2, label: "Slabs" },
    { id: 3, label: "Bote"}
]
units = [
  { id: 1, label: "inch" },
  { id: 2, label: "cm" },
  { id: 3, label: "meter"}
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


 async getUsers(): Promise<any[]>{
    console.log('api called')
    return firstValueFrom(this.httpClient.get<any[]>('http://localhost:8080/getUsers',{
      headers:
          new HttpHeaders(
            {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            }
          )
    }))
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
    unit: new FormControl(''),
    length: new FormControl(''),
    width: new FormControl(''),
    height: new FormControl(''),
    quantity: new FormControl(''),
    quality: new FormControl(''),
    polish: new FormControl(''),
    shape: new FormControl(''),
    deliveryDate: new FormControl(''),
    color: new FormControl(''),
    creationDate: new FormControl(''),
    primaryManager: new FormControl(''),
    secondaryManager: new FormControl(''),
    developedQuantity: new FormControl(''),
    dispatchedQuantity: new FormControl(''),
    leftQuantity: new FormControl(''),
    status: new FormControl('')
  })
  this.orderCompForm.get('productCategory')!.setValue('Handicraft');
  this.orderCompForm.get('status')?.setValue('Recieved');
  this.orderCompForm.get('unit')?.setValue('inch');
  this.orderCompForm.get('deliveryDate')?.setValue(this.currentD);
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
  this.orderCompForm.get('unit')?.setValue(data.unit);
  this.orderCompForm.get('length')?.setValue(data.length);
  this.orderCompForm.get('width')?.setValue(data.width);
  this.orderCompForm.get('height')?.setValue(data.height);
  this.orderCompForm.get('quantity')?.setValue(data.quantity);
  this.orderCompForm.get('quality')?.setValue(data.quality);
  this.orderCompForm.get('polish')?.setValue(data.polish);
  this.orderCompForm.get('shape')?.setValue(data.shape);
  this.orderCompForm.get('deliveryDate')?.setValue(data.deliveryDate);
  this.orderCompForm.get('color')?.setValue(data.color);
  this.orderCompForm.get('creationDate')?.setValue(data.creationDate);
  this.orderCompForm.get('primaryManager')?.setValue(data.primaryManager);
  this.orderCompForm.get('secondaryManager')?.setValue(data.secondaryManager);
  this.orderCompForm.get('developedQuantity')?.setValue(data.developedQuantity);
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
    unit: form.value.unit,
    length: form.value.length,
    width: form.value.width,
    height: form.value.height,
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
  this.disableControl();
  this.isSubmitted = true;
  if(this.dataForEdit!=null && this.dataForEdit!= undefined && Object.keys(this.dataForEdit).length !== 0){
    console.log('id is :: ',this.dataForEdit.id);
    this.responseObj.id = this.dataForEdit.id;
  } 
  console.log('responseObj for new order form :: ',this.responseObj);
  this.postApiCall(this.responseObj).subscribe(data => {
    let res = JSON.parse(JSON.stringify(data))
    console.log('data',data)
    if(res!= null && res != undefined && res.status == '200'){
        console.log('success',res);
        this.orderSuccessDialog = true;
        this.isSubmitted = false;
        this.enableControl();
    }
    else{
      this.orderFailureDialog = true;
      this.isSubmitted = false
      this.enableControl();
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
    unit: form.value.unit,
    length: form.value.length,
    width: form.value.width,
    height: form.value.height,
    quantity: form.value.quantity,
    quality: form.value.quality,
    polish: form.value.polish,
    shape: form.value.shape,
    deliveryDate: form.value.deliveryDate,
    color: form.value.color,
    creationDate: currentTime,
    primaryManager: 'primary manger',
    secondaryManager: form.value.secondaryManager,
    developedQuantity: form.value.developedQuantity,
    dispatchedQuantity: form.value.dispatchedQuantity,
    leftQuantity: form.value.leftQuantity,
    status: form.value.status
  }
}


//Save data for new order confirmation
saveRunningOrder(form: any){
  this.prepareResForRunningOrder(form);
  this.disableControl();
  this.isSubmitted = true;
  if(this.dataForEdit!=null && this.dataForEdit!= undefined && Object.keys(this.dataForEdit).length !== 0){
    console.log('id is :: ',this.dataForEdit.id);
    this.responseObj.id = this.dataForEdit.id;
  } 
  console.log('responseObj for running order form :: ',this.responseObj);
  this.postApiCall(this.responseObj).subscribe(data => {
    let res = JSON.parse(JSON.stringify(data))
    console.log('data',res.status)
    if(res.status == '200'){
        this.orderSuccessDialog = true;
        console.log('success',res);
        this.isSubmitted = false;
    }
    else{
      this.isSubmitted = false;
      this.orderFailureDialog = true;
    }
  })
}
  

postApiCall(data: any){
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(data);
  console.log(body)
  var url = 'https://setu-crm.onrender.com/addOrder'
  return this.httpClient.post(url, body,{'headers':headers})
}

goToRunningOrderComp(){
  this.isRunningOrder = true;
  this.isNewOrder = false;
}

goToNewOrderComp(){
  this.isRunningOrder = false;
  this.isNewOrder = true;
}


disableControl(){
  this.orderCompForm.get('productCategory')?.disable();
  this.orderCompForm.get('partyName')?.disable();
  this.orderCompForm.get('deliveryCity')?.disable();
  this.orderCompForm.get('productCode')?.disable();
  this.orderCompForm.get('productDescription')?.disable();
  this.orderCompForm.get('unit')?.disable();
  this.orderCompForm.get('length')?.disable();
  this.orderCompForm.get('width')?.disable();
  this.orderCompForm.get('height')?.disable();
  this.orderCompForm.get('quantity')?.disable();
  this.orderCompForm.get('quality')?.disable();
  this.orderCompForm.get('polish')?.disable();
  this.orderCompForm.get('shape')?.disable();
  this.orderCompForm.get('deliveryDate')?.disable();
  this.orderCompForm.get('color')?.disable();
  this.orderCompForm.get('creationDate')?.disable();
  this.orderCompForm.get('primaryManager')?.disable();
  this.orderCompForm.get('secondaryManager')?.disable();
  this.orderCompForm.get('developedQuantity')?.disable();
  this.orderCompForm.get('dispatchedQuantity')?.disable();
  this.orderCompForm.get('status')?.disable();
  this.orderCompForm.get('leftQuantity')?.disable();
}

enableControl(){
  this.orderCompForm.get('productCategory')?.enable();
  this.orderCompForm.get('partyName')?.enable();
  this.orderCompForm.get('deliveryCity')?.enable();
  this.orderCompForm.get('productCode')?.enable();
  this.orderCompForm.get('productDescription')?.enable();
  this.orderCompForm.get('unit')?.enable();
  this.orderCompForm.get('length')?.enable();
  this.orderCompForm.get('width')?.enable();
  this.orderCompForm.get('height')?.enable();
  this.orderCompForm.get('quantity')?.enable();
  this.orderCompForm.get('quality')?.enable();
  this.orderCompForm.get('polish')?.enable();
  this.orderCompForm.get('shape')?.enable();
  this.orderCompForm.get('deliveryDate')?.enable();
  this.orderCompForm.get('color')?.enable();
  this.orderCompForm.get('creationDate')?.enable();
  this.orderCompForm.get('primaryManager')?.enable();
  this.orderCompForm.get('secondaryManager')?.enable();
  this.orderCompForm.get('developedQuantity')?.enable();
  this.orderCompForm.get('dispatchedQuantity')?.enable();
  this.orderCompForm.get('status')?.enable();
  this.orderCompForm.get('leftQuantity')?.enable();
}


resetControl(){
  this.orderCompForm.get('productCategory')?.reset();
  this.orderCompForm.get('partyName')?.reset();
  this.orderCompForm.get('deliveryCity')?.reset();
  this.orderCompForm.get('productCode')?.reset();
  this.orderCompForm.get('productDescription')?.reset();
  this.orderCompForm.get('unit')?.reset();
  this.orderCompForm.get('length')?.reset();
  this.orderCompForm.get('width')?.reset();
  this.orderCompForm.get('height')?.reset();
  this.orderCompForm.get('quantity')?.reset();
  this.orderCompForm.get('quality')?.reset();
  this.orderCompForm.get('polish')?.reset();
  this.orderCompForm.get('shape')?.reset();
  this.orderCompForm.get('deliveryDate')?.reset();
  this.orderCompForm.get('color')?.reset();
  this.orderCompForm.get('creationDate')?.reset();
  this.orderCompForm.get('primaryManager')?.reset();
  this.orderCompForm.get('secondaryManager')?.reset();
  this.orderCompForm.get('developedQuantity')?.reset();
  this.orderCompForm.get('dispatchedQuantity')?.reset();
  this.orderCompForm.get('status')?.reset();
  this.orderCompForm.get('leftQuantity')?.reset();
}

dispatchedQuatityChange(quantity: any){
  var totalQuantity = this.orderCompForm.get('quantity')?.value;
  var leftQuantity = Number(totalQuantity) - Number(quantity);
  this.orderCompForm.get('leftQuantity')?.setValue(leftQuantity);
}

}
