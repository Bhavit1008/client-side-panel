import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  public userFormGroup!: FormGroup;
  responseObj:any;
  isSubmitted = false
  userSuccessDialog = false
  userFailureDialog = false


  constructor(private sanitizer: DomSanitizer, private httpClient: HttpClient,private router:Router,private route:ActivatedRoute,private form:FormBuilder) { }

  ngOnInit(){
    this.buildForm();
  }

  get f(){return this.userFormGroup.controls;}


  productCategories = [
    { id: 1, label: "Handicraft" },
    { id: 2, label: "Slabs" },
    { id: 3, label: "Bote"}
]

buildForm(){
  this.userFormGroup = this.form.group({
    fullName: new FormControl(''),
    password: new FormControl(''),
    phoneNumber: new FormControl(''),
    emailAddress: new FormControl(''),
    productCategory: new FormControl(''),
    designation: new FormControl('')
  })
}

prepareResForNewUser(form: any){
  this.responseObj = {
    id: form.value.phoneNumber,
    fullName: form.value.fullName,
    password: form.value.password,
    phoneNumber: form.value.phoneNumber,
    emailAddress: form.value.emailAddress,
    productCategory: form.value.productCategory,
    designation: form.value.designation
  }
  console.log('user details :: ',this.responseObj);
}

saveUserDetails(form:any){
  this.isSubmitted = true
  this.userSuccessDialog = false;
  this.userFailureDialog = false;
  this.prepareResForNewUser(form);
  this.disableControl();

  this.postApiCall(this.responseObj).subscribe(data => {
    let res = JSON.parse(JSON.stringify(data))
    console.log('data',res.status)
    if(res.status == '200'){
        console.log('success',res);
        this.isSubmitted = false;
        this.userSuccessDialog = true;    
    }
    else{
      this.isSubmitted = false;   
      this.userFailureDialog = true;
      
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

postApiCall(data: any){
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(data);
  console.log(body)
  var url = 'http://localhost:8080/addUser'
  return this.httpClient.post(url, body,{'headers':headers})
  
}

enableControl(){
  this.userFormGroup.get('fullName')?.enable();
  this.userFormGroup.get('password')?.enable();
  this.userFormGroup.get('phoneNumber')?.enable();
  this.userFormGroup.get('emailAddress')?.enable();
  this.userFormGroup.get('productCategory')?.enable();
  this.userFormGroup.get('designation')?.enable();
}

disableControl(){
  this.userFormGroup.get('fullName')?.disable();
  this.userFormGroup.get('password')?.disable();
  this.userFormGroup.get('phoneNumber')?.disable();
  this.userFormGroup.get('emailAddress')?.disable();
  this.userFormGroup.get('productCategory')?.disable();
  this.userFormGroup.get('designation')?.disable();
}

resetControl(){
  this.userFormGroup.get('fullName')?.reset();
  this.userFormGroup.get('password')?.reset();
  this.userFormGroup.get('phoneNumber')?.reset();
  this.userFormGroup.get('emailAddress')?.reset();
  this.userFormGroup.get('productCategory')?.reset();
  this.userFormGroup.get('designation')?.reset();
}

}