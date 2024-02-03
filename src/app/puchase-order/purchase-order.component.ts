
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { PurchaseOrder } from '../models/PurchaseOrder';
import { DatePipe } from '@angular/common';
import { GatePass } from '../models/GatePass';
//impoIdrt {MatTableModule} from '@angular/material/table'

@Component({
  selector: 'app-purchaseOrder',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent
{

  public purchaseOrderFormGroup!: FormGroup; 
  isSubmitted = false
  purchaseOrder?: PurchaseOrder;
  purchaseOrderSuccessDialog = false
  purchaseOrderFailureDialog = false
  purchaseOrders : PurchaseOrder[] = [];
  datepipe: DatePipe = new DatePipe('en-in');
  respoIdnseObj = {};
  currentId: string='';
  gatepass?: GatePass;


  constructor(private sanitizer: DomSanitizer, private httpClient: HttpClient,private router:Router,private route:ActivatedRoute,private form:FormBuilder) { }

  get f(){return this.purchaseOrderFormGroup.controls;}

  ngOnInit(){
    this.buildForm();
  }

  //Build/initialize new form controller
  buildForm(){
    this.purchaseOrderFormGroup = this.form.group({
      vehicleNumber: new FormControl(''),
      transporterName: new FormControl(''),
      timeEntered: new FormControl(''),
      timeLeft: new FormControl(''),
      partyName: new FormControl(''),
      items: new FormControl(''),
      manager: new FormControl(''),
      billNumber: new FormControl(''),
      poId: new FormControl(''),
    })
  }

prepareResForNewPurchaseOrder(form: any){

  console.log("in prepareResForNewpurchaseOrder");
  this.purchaseOrder = new PurchaseOrder(
    form.value.vehicleNumber,
    form.value.transporterName,
    form.value.timeEntered,
    form.value.timeLeft,
    form.value.partyName,
    form.value.items,
    form.value.manager,
    form.value.billNumber,
    form.value.poId )

    //console.log('Gate pass details added :: ', this.purchaseOrder);

    this.purchaseOrders.push(this.purchaseOrder);
    console.log('List of Purchase Order details :: ', this.purchaseOrders);
}


  savePurchaseOrderDetails(form: any){
    console.log(" in savepurchaseOrderDetails");
    this.prepareResForNewPurchaseOrder(form);
    this.resetControl();
   
  }

  deletepurchaseOrder(purchaseOrder: PurchaseOrder){
    //console.log(purchaseOrder);
    this.purchaseOrders.forEach( (purchaseOrderItem) =>{
      if(purchaseOrderItem.poId == purchaseOrder.poId){
        this.purchaseOrders.splice(this.purchaseOrders.indexOf(purchaseOrder),1);
      }
    });

    //console.log('List of Gate pass details :: ', this.purchaseOrderes);
  
  }

resetControl(){
  this.purchaseOrderFormGroup.get('partyName')?.reset();
  this.purchaseOrderFormGroup.get('items')?.reset();
  this.purchaseOrderFormGroup.get('billNumber')?.reset();
  this.purchaseOrderFormGroup.get('poId')?.reset();
 }


poIdChange(vehicleNumber: any){
  console.log("poIdChange");
  var vehicleNumber = this.purchaseOrderFormGroup.get('vehicleNumber')?.value;
  let currentDateTime = this.datepipe.transform((new Date), ' MM/dd/yyyy h:mm:ss');
  var poId = String(vehicleNumber) + currentDateTime;
  //console.log(poId);
  this.purchaseOrderFormGroup.get('poId')?.setValue(poId);
}

resetForm(){
  this.purchaseOrderFormGroup.get('vehicleNumber')?.reset();
  this.purchaseOrderFormGroup.get('transporterName')?.reset();
  this.purchaseOrderFormGroup.get('timeEntered')?.reset();
  this.purchaseOrderFormGroup.get('timeLeft')?.reset();
  this.purchaseOrderFormGroup.get('partyName')?.reset();
  this.purchaseOrderFormGroup.get('items')?.reset();
  this.purchaseOrderFormGroup.get('manager')?.reset();
  this.purchaseOrderFormGroup.get('poId')?.reset();
  this.purchaseOrderFormGroup.get('billNumber')?.reset();
}


 setEditValues(purchaseOrder: PurchaseOrder){
  console.log('setEditValues is called');
  this.purchaseOrderFormGroup.get('vehicleNumber')!.setValue(purchaseOrder.vehicleNumber);
  this.purchaseOrderFormGroup.get('transporterName')!.setValue(purchaseOrder.transporterName);
  this.purchaseOrderFormGroup.get('timeEntered')!.setValue(purchaseOrder.timeEntered);
  this.purchaseOrderFormGroup.get('timeLeft')!.setValue(purchaseOrder.timeLeft);
  this.purchaseOrderFormGroup.get('partyName')!.setValue(purchaseOrder.partyName);
  this.purchaseOrderFormGroup.get('items')!.setValue(purchaseOrder.items);
  this.purchaseOrderFormGroup.get('manager')!.setValue(purchaseOrder.manager);
  this.purchaseOrderFormGroup.get('poId')!.setValue(purchaseOrder.poId);
  this.purchaseOrderFormGroup.get('billNumber')!.setValue(purchaseOrder.billNumber);
}

savepurchaseOrders(){
  //console.log("Routing to view gate passes comp");

  var currentTime = new Date();
  this.currentId = currentTime.toString();

  this.isSubmitted = true
  this.purchaseOrderFailureDialog = false;
  this.purchaseOrderSuccessDialog = false;

  this.gatepass = new GatePass(this.currentId, this.purchaseOrders);
  console.log('gate pass entries' +this.gatepass);

  this.postApiCall(this.gatepass).subscribe(data => {
    let res = JSON.parse(JSON.stringify(data))
    console.log('data',res.status)
    if(res.status == '200'){
        console.log('success',res);
      
        this.purchaseOrderSuccessDialog = true;
        this.purchaseOrders = [];
        this.resetForm();
    }
    else{
      this.purchaseOrderFailureDialog = true;
    }
    this.isSubmitted = false;

    let scrollToTop = window.setInterval(() => {
      let poIds = window.pageYOffset;
      if (poIds > 0) {
          window.scrollTo(0, poIds - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 16);

  })

  //this.router.navigate(['/view-gate-passes']);
}



postApiCall(data: any){
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(data);
  console.log(body)
  var url = 'http://localhost:8080/addPurchaseOrder'
  return this.httpClient.post(url, body,{'headers':headers})
}


}