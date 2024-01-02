import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { GatePass } from '../models/GatePass';
import { DatePipe } from '@angular/common';
//import {MatTableModule} from '@angular/material/table'

@Component({
  selector: 'app-gatepass',
  templateUrl: './gatepass.component.html',
  styleUrls: ['./gatepass.component.css']
})
export class GatepassComponent {

  public gatePassFormGroup!: FormGroup; 
  isSubmitted = false
  gatepass?: GatePass;
  gatePassSuccessDialog = false
  gatePassFailureDialog = false
  entries : GatePass[] = [];
  datepipe: DatePipe = new DatePipe('en-in');
  gp?: any;


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
  var currentTime = new Date();
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

    this.entries.push(this.gatepass);
    console.log('List of Gate pass details :: ', this.entries);

  
}


saveGatePassDetails(form: any){
  console.log(" in saveGatePassDetails");
  this.prepareResForNewGatePass(form);
  this.resetControl();

  let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);

    
  }

  deleteGatePass(gatepass: GatePass){
    //console.log(gatepass);
    this.entries.forEach( (gatepassItem) =>{
      if(gatepassItem.po == gatepass.po){
        this.entries.splice(this.entries.indexOf(gatepass),1);
      }
    });

    //console.log('List of Gate pass details :: ', this.entries);
  
  }



resetControl(){
  this.gatePassFormGroup.get('partyName')?.reset();
  this.gatePassFormGroup.get('items')?.reset();
  this.gatePassFormGroup.get('billNumber')?.reset();
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


}

