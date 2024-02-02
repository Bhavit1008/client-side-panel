import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { GatePass } from '../models/GatePass';
import { DatePipe } from '@angular/common';
import { GatePassEntries } from '../models/GatePassEntries';
//import {MatTableModule} from '@angular/material/table'

@Component({
  selector: 'app-gatepass',
  templateUrl: './gatepass.component.html',
  styleUrls: ['./gatepass.component.css']
})
export class GatepassComponent
{

  public gatePassFormGroup!: FormGroup; 
  isSubmitted = false
  gatepass?: GatePass;
  gatePassSuccessDialog = false
  gatePassFailureDialog = false
  gatepasses : GatePass[] = [];
  datepipe: DatePipe = new DatePipe('en-in');
  gp?: any;
  responseObj = {};
  currentId: string='';
  gatePassEntries?: GatePassEntries;


  constructor(private sanitizer: DomSanitizer, private httpClient: HttpClient,private router:Router,private route:ActivatedRoute,private form:FormBuilder) { }

  get f(){return this.gatePassFormGroup.controls;}

  ngOnInit(){
    this.buildForm();
  }

  //Build/initialize new form controller
  buildForm(){
    this.gatePassFormGroup = this.form.group({
      vehicleNumber: new FormControl(''),
      transporterName: new FormControl(''),
      timeEntered: new FormControl(''),
      timeLeft: new FormControl(''),
      partyName: new FormControl(''),
      items: new FormControl(''),
      manager: new FormControl(''),
      billNumber: new FormControl(''),
      po: new FormControl(''),
    })
  }

prepareResForNewGatePass(form: any){

  console.log("in prepareResForNewGatePass");
  this.gatepass = new GatePass(
    form.value.vehicleNumber,
    form.value.transporterName,
    form.value.timeEntered,
    form.value.timeLeft,
    form.value.partyName,
    form.value.items,
    form.value.manager,
    form.value.billNumber,
    form.value.po )

    //console.log('Gate pass details added :: ', this.gatepass);

    this.gatepasses.push(this.gatepass);
    console.log('List of Gate pass details :: ', this.gatepasses);
}


  saveGatePassDetails(form: any){
    console.log(" in saveGatePassDetails");
    this.prepareResForNewGatePass(form);
    this.resetControl();
   
  }

  deleteGatePass(gatepass: GatePass){
    //console.log(gatepass);
    this.gatepasses.forEach( (gatepassItem) =>{
      if(gatepassItem.po == gatepass.po){
        this.gatepasses.splice(this.gatepasses.indexOf(gatepass),1);
      }
    });

    //console.log('List of Gate pass details :: ', this.gatepasses);
  
  }

resetControl(){
  this.gatePassFormGroup.get('partyName')?.reset();
  this.gatePassFormGroup.get('items')?.reset();
  this.gatePassFormGroup.get('billNumber')?.reset();
  this.gatePassFormGroup.get('po')?.reset();
 }


poChange(vehicleNumber: any){
  //console.log("poChange");
  var vehicleNumber = this.gatePassFormGroup.get('vehicleNumber')?.value;
  let currentDateTime = this.datepipe.transform((new Date), ' MM/dd/yyyy h:mm:ss');
  var po = String(vehicleNumber) + currentDateTime;
  //console.log(po);
  this.gatePassFormGroup.get('po')?.setValue(po);
}

resetForm(){
  this.gatePassFormGroup.get('vehicleNumber')?.reset();
  this.gatePassFormGroup.get('transporterName')?.reset();
  this.gatePassFormGroup.get('timeEntered')?.reset();
  this.gatePassFormGroup.get('timeLeft')?.reset();
  this.gatePassFormGroup.get('partyName')?.reset();
  this.gatePassFormGroup.get('items')?.reset();
  this.gatePassFormGroup.get('manager')?.reset();
  this.gatePassFormGroup.get('po')?.reset();
  this.gatePassFormGroup.get('billNumber')?.reset();
}


 setEditValues(gatepass: GatePass){
  console.log('setEditValues is called');
  this.gatePassFormGroup.get('vehicleNumber')!.setValue(gatepass.vehicleNumber);
  this.gatePassFormGroup.get('transporterName')!.setValue(gatepass.transporterName);
  this.gatePassFormGroup.get('timeEntered')!.setValue(gatepass.timeEntered);
  this.gatePassFormGroup.get('timeLeft')!.setValue(gatepass.timeLeft);
  this.gatePassFormGroup.get('partyName')!.setValue(gatepass.partyName);
  this.gatePassFormGroup.get('items')!.setValue(gatepass.items);
  this.gatePassFormGroup.get('manager')!.setValue(gatepass.manager);
  this.gatePassFormGroup.get('po')!.setValue(gatepass.po);
  this.gatePassFormGroup.get('billNumber')!.setValue(gatepass.billNumber);
}

saveGatePasses(){
  //console.log("Routing to view gate passes comp");

  var currentTime = new Date();
  this.currentId = currentTime.toString();

  this.isSubmitted = true
  this.gatePassFailureDialog = false;
  this.gatePassSuccessDialog = false;

  this.gatePassEntries = new GatePassEntries(this.currentId, this.gatepasses);
  console.log('gate pass entries' +this.gatePassEntries);

  this.postApiCall(this.gatePassEntries).subscribe(data => {
    let res = JSON.parse(JSON.stringify(data))
    console.log('data',res.status)
    if(res.status == '200'){
        console.log('success',res);
      
        this.gatePassSuccessDialog = true;
        this.gatepasses = [];
        this.resetForm();
    }
    else{
      this.gatePassFailureDialog = true;
    }
    this.isSubmitted = false;

    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
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
  var url = 'http://localhost:8080/addGatePass'
  return this.httpClient.post(url, body,{'headers':headers})
}


}