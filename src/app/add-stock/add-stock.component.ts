import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent {

  public stockFormGroup!: FormGroup;
  isSubmitted = false
  responseObj = {}
  stockSuccessDialog = false
  stockFailureDialog = false

  selectedFile: any;
  x:any;
  image:any;

  productCategories = [
    { id: 1, label: "Handicraft" },
    { id: 2, label: "Slabs" },
    { id: 3, label: "Bote"}
]

  warehouse= [
    { id: 1, label: "Setu" },
    { id: 2, label: "Mugdha" },
    { id: 3, label: "Craftman"}
  ]

  constructor(private sanitizer: DomSanitizer, private httpClient: HttpClient,private router:Router,private route:ActivatedRoute,private form:FormBuilder) { }

  get f(){return this.stockFormGroup.controls;}

  ngOnInit(){
    this.buildForm();
  }

  //Build/initialize new form controller
buildForm(){
  this.stockFormGroup = this.form.group({
    productCategory: new FormControl(''),
    productCode: new FormControl(''),
    companyAddress: new FormControl(''),
    productQuantity: new FormControl(''),
    dateOfStocking: new FormControl(''),
    warehouse: new FormControl(''),
    productLocation: new FormControl(''),
    associatedManager: new FormControl(''),
    relatedParty: new FormControl(''),
    previewImg: new FormControl()
  })
}

prepareResForNewStock(form: any){
  var currentTime = new Date();
  this.responseObj = {
    id: form.value.productCode,
    productCategory: form.value.productCategory,
    productCode: form.value.productCode,
    productQuantity: form.value.productQuantity,
    dateOfStocking: form.value.dateOfStocking,
    warehouse: form.value.warehouse,
    productLocation: form.value.productLocation,
    associatedManager: form.value.associatedManager,
    relatedParty: form.value.relatedParty,
    productImage: this.x
  }
  console.log('stock added :: ', this.responseObj)
}

postApiCall(data: any){
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(data);
  console.log(body)
  var url = 'https://setu-crm.onrender.com/addStock'
  return this.httpClient.post(url, body,{'headers':headers})
}



saveStockDetails(form: any){
  this.isSubmitted = true
  this.stockSuccessDialog = false;
  this.stockFailureDialog = false;
  this.prepareResForNewStock(form);
  this.disableControl();

  this.postApiCall(this.responseObj).subscribe(data => {
    let res = JSON.parse(JSON.stringify(data))
    console.log('data',res.status)
    if(res.status == '200'){
        console.log('success',res);
        this.isSubmitted = false;
        this.stockSuccessDialog = true;  
    }
    else{
      this.stockFailureDialog = true;
      this.isSubmitted = false;
    }
    this.enableControl();
   // this.resetControl;
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

disableControl(){
  this.stockFormGroup.get('productCategory')?.disable();
  this.stockFormGroup.get('productQuantity')?.disable();
  this.stockFormGroup.get('dateOfStocking')?.disable();
  this.stockFormGroup.get('warehouse')?.disable();
  this.stockFormGroup.get('productLocation')?.disable();
  this.stockFormGroup.get('associatedManager')?.disable();
  this.stockFormGroup.get('relatedParty')?.disable();
}

enableControl(){
  this.stockFormGroup.get('productCategory')?.enable();
  this.stockFormGroup.get('productQuantity')?.enable();
  this.stockFormGroup.get('dateOfStocking')?.enable();
  this.stockFormGroup.get('warehouse')?.enable();
  this.stockFormGroup.get('productLocation')?.enable();
  this.stockFormGroup.get('associatedManager')?.enable();
  this.stockFormGroup.get('relatedParty')?.enable();
}


resetControl(){
  this.stockFormGroup.get('productCategory')?.reset();
  this.stockFormGroup.get('productQuantity')?.reset();
  this.stockFormGroup.get('dateOfStocking')?.reset();
  this.stockFormGroup.get('warehouse')?.reset();
  this.stockFormGroup.get('productLocation')?.reset();
  this.stockFormGroup.get('associatedManager')?.reset();
  this.stockFormGroup.get('relatedParty')?.reset();
}


  onFileSelected(event: any)
  {
    this.selectedFile = event.target.files[0];
    console.log('selected image :: ', this.selectedFile)
    if(this.selectedFile!=undefined)
    this.selectedFile.arrayBuffer().then((buff: Iterable<number>) => {
      this.x = new Uint8Array(buff); // x is your uInt8Array
      // perform all required operations with x here.
      console.log(this.x);

      const content = this.x;
      const STRING_CHAR = content.reduce((data: string, byte: number)=> {
        return data + String.fromCharCode(byte);
        }, '');

        let base64String = btoa(STRING_CHAR);
        this.x = base64String
        this.image = 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(base64String) as any).changingThisBreaksApplicationSecurity;
      
  });

  
  }

    getAsByteArray(file: any) {
    return new Uint8Array(file)
  }
}
