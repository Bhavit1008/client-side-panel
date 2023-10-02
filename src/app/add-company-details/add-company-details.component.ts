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

  isSubmitted = false;
  public companyFormGroup!: FormGroup;
  isNewCompany = true;
  responseObj = {}

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
}

postApiCall(data: any){
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(data);
  console.log(body)
  var url = 'http://localhost:8080/addCompany'
  return this.httpClient.post(url, body,{'headers':headers})
}

saveCompanyDetails(form: any){
  this.prepareResForNewCompany(form);
  console.log('responseObj for running order form :: ',this.responseObj);
  this.postApiCall(this.responseObj).subscribe(data => {
    let res = JSON.parse(JSON.stringify(data))
    console.log('data',res.status)
    if(res.status == '200'){
        console.log('success',res);
        this.isSubmitted = false;
    }
    else{
      this.isSubmitted = false;
    }
  })
}

}
