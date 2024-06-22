import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-get-stock',
  templateUrl: './get-stock.component.html',
  styleUrls: ['./get-stock.component.css']
})
export class GetStockComponent {

  constructor(private httpClient: HttpClient, private form:FormBuilder, private router: Router){}
  public getStockCompForm!: FormGroup;
  response: any
  adminAccess: boolean = true;
  isFetching = false
  category = [
    { id: 1, label: "Marble" },
    { id: 2, label: "Granite" },
    { id: 3, label: "Imported"},
    { id: 4, label: "Other"},
    { id: 5, label: "Get All Stock"},
  ]
      

  ngOnInit(){
    this.buildForm()
    
  }

  buildForm(){
    this.getStockCompForm = this.form.group({
      selectCategory: new FormControl(''),
      dateOfStocking: new FormControl(''),
      endDate: new FormControl('')
    })
  }

  postApiCall(reqBody: any): Promise<any[]>{
    console.log('api called')
    this.isFetching = true
    var credObj = this.getDataFromLocalStorage()
    var manager = credObj.manager;
    var category = credObj.category;
    var designation = credObj.designation;
    return firstValueFrom(this.httpClient.post<any[]>('http://localhost:8080/getStock',reqBody,{
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

  }

  viewOrder(num: any){

  }

  onSelectStatusChange(form: any){
    console.log('category :: ', form.value.selectCategory)
    console.log('start date :: ', form.value.dateOfStocking)
    console.log('end date :: ', form.value.endDate)
    var reqBody = {
      category: form.value.selectCategory,
      startDate: form.value.dateOfStocking,
      endDate: form.value.endDate
    }

    this.postApiCall(reqBody).then((res) => {
      this.response = res;
      console.log('fetched response ::', res);
      this.isFetching = false
  });
  }
}
