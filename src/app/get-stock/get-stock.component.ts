import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-get-stock',
  templateUrl: './get-stock.component.html',
  styleUrls: ['./get-stock.component.css']
})
export class GetStockComponent {
  public getStockCompForm!: FormGroup;
  response: any
  adminAccess: boolean = false;
  isFetching = false
  userRole: any;
  users: any;
  manager: any;
  designation:any;
  uCategory:any;
  displayStyle = 'none';
  viewStyle = 'none';
  itemToBeDeleted:any;
  currentElementToView: any;
  dataForEdit:any;

  category = [
    { id: 1, label: "Marble" },
    { id: 2, label: "Granite" },
    { id: 3, label: "Imported"},
    { id: 4, label: "Other"},
    { id: 5, label: "Get All Stock"},
  ]

  colors=[
    { id: 1, label: "White" },
    { id: 2, label: "Brown" },
    { id: 3, label: "Black" },
    { id: 4, label: "Red" },
    { id: 5, label: "Green"}
  ]

  constructor(private httpClient: HttpClient,private route:ActivatedRoute , private form:FormBuilder, private router: Router){
    var response = this.getUsers().then((res) => {
      console.log('fetched response ::', res);
      this.users = res;
  });
  }
      
  ngOnInit(){
    this.buildForm()
    var credObj = this.getDataFromLocalStorage()
    this.manager = credObj.manager;
    this.uCategory = credObj.category;
    this.designation = credObj.designation;
    if(this.designation==='admin'){
      this.userRole=true
      this.adminAccess=true
    }
  }

  buildForm(){
    this.getStockCompForm = this.form.group({
      selectCategory: new FormControl(''),
      selectColor: new FormControl('')
    })
  }

  postApiCall(reqBody: any,url: any): Promise<any[]>{
    console.log('api called')
    this.isFetching = true
    return firstValueFrom(this.httpClient.post<any[]>(url,reqBody,{
      headers:
          new HttpHeaders(
            {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            }
          )
    }))
  }

  getDataFromLocalStorage(){
    var credentials = localStorage.getItem('cred');
    var credObj = credentials != null ? JSON.parse(credentials) : null;
    console.log('credentials :: ',credObj);
    return credObj;
  }

  openPopup(num:any){
    this.displayStyle='block';
    this.itemToBeDeleted = num;
  }

  deleteFromPopup(){
    var index = this.response.indexOf(this.itemToBeDeleted);
    if (index !== -1) {
      this.response.splice(index, 1);
    }
    this.postApiCall(this.itemToBeDeleted,'https://setu-crm.onrender.com/deleteStock').then((res) => {
      this.response = res;
      console.log('fetched response ::', res);
      this.isFetching = false
  });
    this.displayStyle = "none";
  }

  closePopup(){
    this.displayStyle = "none";
    this.viewStyle= "none";
  }

  viewOrder(order: any){
    this.viewStyle = "block";
    this.currentElementToView = order;
    //this.router.navigate(['/order-details', this.currentElementToView]);
    console.log(this.currentElementToView);
  }

  onSelectStatusChange(form: any){
    var reqBody = {
      category: form.value.selectCategory,
      color: form.value.selectColor
    }

    this.postApiCall(reqBody,'https://setu-crm.onrender.com/getStock').then((res) => {
      this.response = res;
      console.log('fetched response ::', res);
      this.isFetching = false
  });
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
