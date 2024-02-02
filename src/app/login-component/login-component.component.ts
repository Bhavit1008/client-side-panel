import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  loginSuccess = false;
  public loginCompForm!: FormGroup;

  ngOnInit(): void {
    this.buildForm()
    localStorage.clear();
  }

 
  constructor(private form:FormBuilder, private cookieService: CookieService, private httpClient: HttpClient){}

  buildForm(){
    this.loginCompForm = this.form.group({
      loginId: new FormControl(''),
      password: new FormControl('')
    })
  }

  get f(){
    return this.loginCompForm.controls;
  }

  login(form: any){
    var request = this.getValuesForLogin(form)
    //logic to check credentials on db
    console.log('cred :: ',request.loginId)
    //declare date and get current date time
    var date = new Date();
    //add 20 minutes to date
    var loginDto = {
      username: request.loginId,
      password: request.password
    }
    var response = this.postApiCall(loginDto);
    console.log('login response ::', response.pipe);
    this.postApiCall(loginDto).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data))
      this.loginSuccess = true;
      var credObj = {
        isLoginSuccessful: 'yes',
        userId: request.loginId,
        password: request.password,
        manager: res.username,
        category: res.role,
        designation: res.designation,
        ttl: date.getTime()+(15 * 60 * 1000)
      }
      console.log('obj :: ',credObj)
      localStorage.setItem('cred', JSON.stringify(credObj));
    })
  }

  callApi(loginDto: any){
    console.log('login dto ::',loginDto)
    return this.httpClient.post<any[]>('https://setu-crm.onrender.com/login',loginDto,{
      headers:
          new HttpHeaders(
            {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            }
          )
    })
  }

  postApiCall(data: any){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(data);
    console.log(body)
    var url = 'https://setu-crm.onrender.com/login'
    return this.httpClient.post(url, body,{'headers':headers})
  }

  getValuesForLogin(form: any){
    var loginObj = {
      loginId: form.value.loginId,
      password: form.value.password
    }
    return loginObj
  }

}
