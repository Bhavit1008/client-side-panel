import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PurchaseOrder } from '../models/PurchaseOrder';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { start } from '@popperjs/core';


@Component({
  selector: 'app-view-gatepass',
  templateUrl: './view-gatepass.component.html',
  styleUrls: ['./view-gatepass.component.css']
})
export class ViewGatepassComponent
{

  currentElementToView: any;
  displayStyle = 'none';
  response: any = [];
  public getGatePassCompForm!: FormGroup;
  isFetching: boolean = false;
  filteredGatepasses: any;
  datesValid: boolean = false;

  constructor( private http: HttpClient,private route:ActivatedRoute,  private router: Router, private form:FormBuilder) { }

  ngOnInit() {
    
    this.getGatePasses();
    this.buildForm();
    //console.log(this.entries);
    }

  buildForm() {
    this.getGatePassCompForm = this.form.group({
      selectStartDate: new FormControl(''),
      selectEndDate: new FormControl('')
    })
  }

  checkDates(selectStartDate: any, selectEndDate: any){
    this.datesValid = false;

    var startDate = this.getGatePassCompForm.get('selectStartDate')?.value;
    var endDate = this.getGatePassCompForm.get('selectEndDate')?.value;

    if( (Date.parse(startDate) <=
    Date.parse(endDate)) && 
   ( ( Date.parse(new Date(selectEndDate).toLocaleDateString())) 
    <= (Date.parse(new Date().toLocaleDateString()))) ){
      this.datesValid = true; 
    }
     
  }

  onSelectShowResult(event:any){
    
    this.isFetching = true;
   this.response = this.postApiCall().subscribe((res) => {
      this.isFetching = false;
      this.response = res;
      var startDate = event.value.selectStartDate;
      var endDate = event.value.selectEndDate;
      
      if(this.response!=undefined && this.response!=null){
        this.filteredGatepasses = this.getFilteredGatePasses(this.response, startDate, endDate);
        console.log(this.filteredGatepasses);
      }
      else{
        console.log("else stat");

      }
      

    })
}
  getFilteredGatePasses(response: any, startDate: string, endDate: string){
    var filteredGatepasses = [];
    console.log("array recieved in getFiltred gate passes function:" +response);

    for(var i=0;i<response.length;i++){
      const date = new Date(response[i].timeLeft);
      console.log('data :: ',date);
      if(Date.parse(new Date(response[i].timeLeft).toLocaleDateString())>= 
                  Date.parse(new Date(startDate).toLocaleDateString()) && 
        Date.parse(new Date(response[i].timeLeft).toLocaleDateString())<=
                Date.parse(new Date(endDate).toLocaleDateString())){
        filteredGatepasses.push(response[i]);
      } 
    }
    return filteredGatepasses;
  }

  postApiCall(): Observable<PurchaseOrder[]>{
  {
    return  this.http.get<any[]>('http://localhost:8080/allGatePasses');
  }
}


  viewGatePass(gatepass: any)
  {
    this.currentElementToView = gatepass;
    this.displayStyle = "block"
  }

  closeGatePass()
  {
    this.displayStyle = 'none'
  }



getGatePasses() 
{
    this.response = this.postApiCall().subscribe(data => {
    //console.log('response data from api :: ',data);
    console.log(this.response);
})
}



}

