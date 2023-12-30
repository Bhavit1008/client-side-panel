import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company-details',
  templateUrl: './add-company-details.component.html',
  styleUrls: ['./add-company-details.component.css']
})
export class AddCompanyDetailsComponent {

  public companyFormGroup!: FormGroup;
  isNewCompany = true;
  responseObj = {}
  isSubmitted = false
  companySuccessDialog = false
  companyFailureDialog = false


  constructor(private httpClient: HttpClient,private router:Router,private route:ActivatedRoute,private form:FormBuilder) { }

  //companyFormGroup
  get f(){return this.companyFormGroup.controls;}

  ngOnInit(){
    this.buildForm();
  }

  //Build/initialize new form controller
buildForm(){
  this.companyFormGroup = this.form.group({
    companyName: new FormControl(''),
    companyOwnerName: new FormControl(''),
    companyAddress: new FormControl(''),
    state: new FormControl(''),
    zipCode: new FormControl(''),
    gstNumber: new FormControl(''),
    contactNumber: new FormControl(''),
    emailAddress: new FormControl(''),
  })
}

prepareResForNewCompany(form: any){
  var currentTime = new Date();
  this.responseObj = {
    companyName: form.value.companyName,
    companyOwnerName: form.value.companyOwnerName,
    companyAddress: form.value.companyAddress,
    state: form.value.state,
    zipCode: form.value.zipCode,
    gstNumber: form.value.gstNumber,
    contactNumber: form.value.contactNumber,
    emailAddress: form.value.emailAddress,
  }

  console.log('responseObj for new Company form :: ',this.responseObj);
}

postApiCall(data: any){
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(data);
  console.log(body)
  var url = 'http://localhost:8080/addCompany'
  return this.httpClient.post(url, body,{'headers':headers})
}

saveCompanyDetails(form: any){
  this.isSubmitted = true
  this.companySuccessDialog = false;
  this.companyFailureDialog = false;
  this.prepareResForNewCompany(form);
  this.disableControl();
  
  this.postApiCall(this.responseObj).subscribe(data => {
    let res = JSON.parse(JSON.stringify(data))
    console.log('data',res.status)
    if(res.status == '200'){
        console.log('success',res);
        this.isSubmitted = false;
        this.companySuccessDialog = true;
    }
    else{
      this.isSubmitted = false;
      this.companyFailureDialog = true;
    }
    this.enableControl();
    //this.resetControl();
  })

  let scrollToTop = window.setInterval(() => {
    let pos = window.pageYOffset;
    if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
    } else {
        window.clearInterval(scrollToTop);
    }
}, 16);

}

enableControl(){
  this.companyFormGroup.get('companyName')?.enable();
  this.companyFormGroup.get('companyOwnerName')?.enable();
  this.companyFormGroup.get('companyAddress')?.enable();
  this.companyFormGroup.get('state')?.enable();
  this.companyFormGroup.get('zipCode')?.enable();
  this.companyFormGroup.get('gstNumber')?.enable();
  this.companyFormGroup.get('contactNumber')?.enable();
  this.companyFormGroup.get('emailAddress')?.enable();  
}

disableControl(){
  this.companyFormGroup.get('companyName')?.disable();
  this.companyFormGroup.get('companyOwnerName')?.disable();
  this.companyFormGroup.get('companyAddress')?.disable();
  this.companyFormGroup.get('state')?.disable();
  this.companyFormGroup.get('zipCode')?.disable();
  this.companyFormGroup.get('gstNumber')?.disable();
  this.companyFormGroup.get('contactNumber')?.disable();
  this.companyFormGroup.get('emailAddress')?.disable();
}

resetControl(){
  this.companyFormGroup.get('companyName')?.reset();
  this.companyFormGroup.get('companyOwnerName')?.reset();
  this.companyFormGroup.get('companyAddress')?.reset();
  this.companyFormGroup.get('state')?.reset();
  this.companyFormGroup.get('zipCode')?.reset();
  this.companyFormGroup.get('gstNumber')?.reset();
  this.companyFormGroup.get('contactNumber')?.reset();
  this.companyFormGroup.get('emailAddress')?.reset();  
}

}
