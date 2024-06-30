import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

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
  companies: any;
  users: any;
  selectedFile: any;
  x:any;
  image:any;
  displayedColumns: string[] = ['id', 'length', 'width', 'sqft', 'edit'];
  dataSource: any[] = [
    { id: 1, length: '12', width: '3', sqft: '36'}
  ];
  editedRowIndex: any=1;

  productCategories = [
    { id: 1, label: "Marble" },
    { id: 2, label: "Granite" },
    { id: 3, label: "Imported"},
    { id: 3, label: "Other"},
]

  warehouse= [
    { id: 1, label: "Setu" },
    { id: 2, label: "Mugdha" },
    { id: 3, label: "Craftman"},
    { id: 4, label: "Muradabad"},
  ]

  products=[
    { id: 1, label: "marble" }
  ]

  colors=[
    { id: 1, label: "White" },
    { id: 2, label: "Brown" },
    { id: 3, label: "Black" },
    { id: 4, label: "Red" },
    { id: 5, label: "Green"}
  ]

  dataForEdit: any;

  constructor(private sanitizer: DomSanitizer, private httpClient: HttpClient,private router:Router,private route:ActivatedRoute,private form:FormBuilder) {
    var response = this.getCompanies().then((res) => {
      console.log('fetched response ::', res);
      this.companies = res;
  });

  var response = this.getUsers().then((res) => {
    console.log('fetched response ::', res);
    this.users = res;
});
  }


  get f(){return this.stockFormGroup.controls;}

  ngOnInit(){
    this.buildForm();
    // var data = this.route.params.subscribe(params => {
    //   this.dataForEdit = params
    // });

    this.route.paramMap
      .pipe(map(() => window.history.state)).subscribe(res=>{
            console.log('resulty :: ',res)
            this.dataForEdit = res                             
       })
    console.log('data for edit :: ', this.dataForEdit);
    console.log('Data from get page for edit :: ',this.dataForEdit);
    if(this.dataForEdit!=null && this.dataForEdit!= undefined && Object.keys(this.dataForEdit).length !== 0 && this.dataForEdit.product!=undefined){
      console.log('dataForEdit is not empty');
      this.setEditValues(this.dataForEdit);
    }
  }

  //Build/initialize new form controller
buildForm(){
  this.stockFormGroup = this.form.group({
    productCategory: new FormControl(''),
    product: new FormControl(''),
    productCode: new FormControl(''),
    quality: new FormControl(''),
    productDescription: new FormControl(''),
    productPolish: new FormControl(''),
    companyAddress: new FormControl(''),
    productQuantity: new FormControl(''),
    dateOfStocking: new FormControl(''),
    warehouse: new FormControl(''),
    productRate: new FormControl(''),
    color: new FormControl(''),
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
    product: form.value.product,
    productCode: form.value.productCode,
    quality: form.value.quality,
    productDescription: form.value.productDescription,
    productPolish: form.value.productPolish,
    productQuantity: form.value.productQuantity,
    dateOfStocking: form.value.dateOfStocking,
    warehouse: form.value.warehouse,
    productRate: form.value.productRate,
    color: form.value.color,
    associatedManager: form.value.associatedManager,
    relatedParty: form.value.relatedParty,
    slabDetails: this.dataSource,
    productImage: this.image
  }
  console.log('stock added :: ', this.responseObj)
}

setEditValues(dataForEdit: any) {
  console.log('data for edit ::', dataForEdit)
  this.stockFormGroup.get('productCategory')?.setValue(dataForEdit.productCategory);
  this.products = [
    {
      id: 1,
      label: dataForEdit.product
    }
  ]
  this.stockFormGroup.get('product')?.setValue(dataForEdit.product);
  this.stockFormGroup.get('productCode')?.setValue(dataForEdit.productCode);
  this.stockFormGroup.get('quality')?.setValue(dataForEdit.quality);
  this.stockFormGroup.get('productDescription')?.setValue(dataForEdit.productDescription);
  this.stockFormGroup.get('productPolish')?.setValue(dataForEdit.productPolish);
  this.stockFormGroup.get('productQuantity')?.setValue(dataForEdit.productQuantity);
  this.stockFormGroup.get('dateOfStocking')?.setValue(dataForEdit.dateOfStocking);
  this.stockFormGroup.get('warehouse')?.setValue(dataForEdit.warehouse);
  this.stockFormGroup.get('associatedManager')?.setValue(dataForEdit.associatedManager);
  this.stockFormGroup.get('productRate')?.setValue(dataForEdit.productRate);
  console.log('slab details ::', dataForEdit.slabDetails)
  this.dataSource = dataForEdit.slabDetails
  this.stockFormGroup.get('color')?.setValue(dataForEdit.color);
  this.stockFormGroup.get('productImage')?.setValue(dataForEdit.productImage);
  this.image = dataForEdit.productImage;
  this.responseObj = dataForEdit
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
  this.stockFormGroup.get('product')?.disable();
  this.stockFormGroup.get('productDescription')?.disable();
  this.stockFormGroup.get('productQuantity')?.disable();
  this.stockFormGroup.get('quality')?.disable();
  this.stockFormGroup.get('dateOfStocking')?.disable();
  this.stockFormGroup.get('warehouse')?.disable();
  this.stockFormGroup.get('productRate')?.disable();
  this.stockFormGroup.get('associatedManager')?.disable();
  this.stockFormGroup.get('relatedParty')?.disable();
}

enableControl(){
  this.stockFormGroup.get('productCategory')?.enable();
  this.stockFormGroup.get('product')?.enable();
  this.stockFormGroup.get('productDescription')?.enable();
  this.stockFormGroup.get('productQuantity')?.enable();
  this.stockFormGroup.get('quality')?.enable();
  this.stockFormGroup.get('dateOfStocking')?.enable();
  this.stockFormGroup.get('warehouse')?.enable();
  this.stockFormGroup.get('productRate')?.enable();
  this.stockFormGroup.get('associatedManager')?.enable();
  this.stockFormGroup.get('relatedParty')?.enable();
}


resetControl(){
  this.stockFormGroup.get('productCategory')?.reset();
  this.stockFormGroup.get('product')?.reset();
  this.stockFormGroup.get('productDescription')?.reset();
  this.stockFormGroup.get('productQuantity')?.reset();
  this.stockFormGroup.get('quality')?.reset();
  this.stockFormGroup.get('dateOfStocking')?.reset();
  this.stockFormGroup.get('warehouse')?.reset();
  this.stockFormGroup.get('productRate')?.reset();
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

  selectProductOnCategory($event: any){
    let category = $event.target.options[$event.target.options.selectedIndex].text;
    console.log('product category :: ', category);
    if(category=='Marble'){
      console.log('marble selected if condition-')
      this.products = [
        { id: 1, label: "Banswara White"},
        { id: 2, label: "Banswara Purple"},
        { id: 3, label: "Kesariya Green"},
      ]
    }
    if(category=='Granite'){
      this.products = [
        { id: 1, label: "Telephone Black"},
        { id: 2, label: "Rajasthan Black"},
      ]
    }
    if(category=='Imported'){
      this.products = [
        { id: 1, label: "Travertine Beige"},
        { id: 2, label: "Travertine Brown"},
        { id: 2, label: "Dark Emprador"},
        { id: 2, label: "Statuario"},
        { id: 2, label: "Botochino"},
      ]
    }
    if(category=='Other'){
      this.products = [
        { id: 1, label: "Kadapa"},
      ]
    }
  }

    getAsByteArray(file: any) {
    return new Uint8Array(file)
  }

  
  startEditing(index: number) {
    this.editedRowIndex = index;
  }
  cancelEditing() {
    this.editedRowIndex = -1;
  }
  saveRow(row: any) {
    // Perform the save operation here, such as making an API call
    if(row.length!=undefined && row.width!=undefined) 
    row.sqft = (Number(row.length) * Number(row.width))/144;
    console.log('Saving row', Number(row.length) * Number(row.width));
    this.dataSource[row.id-1] = row
    console.log(this.dataSource[0])
    this.dataSource = Object.assign([], this.dataSource);
    this.editedRowIndex = -1;
  }
  addRow(){
    console.log('current datasource :: ',this.dataSource);
    let arr = {
      id: this.dataSource.length + 1,
      length: 0,
      width: 0,
      sqft: 0
    }
    this.dataSource.push(arr);
    this.dataSource = Object.assign([], this.dataSource);
  }

deleteRow(row: any){
  let index = this.dataSource.indexOf(row)
  if(index!=-1){
    this.dataSource.splice(index,1)
    for(let i=0;i<this.dataSource.length;i++){
      this.dataSource[i].id = i+1;
    }
    this.dataSource = Object.assign([], this.dataSource);
  }
}

async getCompanies(): Promise<any[]>{
  console.log('api called')
  return firstValueFrom(this.httpClient.get<any[]>('https://setu-crm.onrender.com/getCompany',{
    headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          }
        )
  }))
}

async getUsers(): Promise<any[]>{
  console.log('api called')
  return firstValueFrom(this.httpClient.get<any[]>('https://setu-crm.onrender.com/getUsers',{
    headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          }
        )
  }))
}

}
