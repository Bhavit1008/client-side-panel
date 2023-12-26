import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

saveUserDetails(form:any){
  var userObj = {}
  userObj = {
    id: form.value.phoneNumber,
    fullName: form.value.fullName,
    password: form.value.password,
    phoneNumber: form.value.phoneNumber,
    emailAddress: form.value.emailAddress,
    productCategory: form.value.productCategory,
    designation: form.value.designation
  };
  this.responseObj = userObj
  console.log('user details :: ',this.responseObj);

  this.postApiCall(this.responseObj).subscribe(data => {
    let res = JSON.parse(JSON.stringify(data))
    console.log('data',res.status)
    if(res.status == '200'){
        console.log('success',res);
    }
    else{
      
    }
  })

}

postApiCall(data: any){
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(data);
  console.log(body)
  var url = 'http://localhost:8080/addUser'
  return this.httpClient.post(url, body,{'headers':headers})
}

}
