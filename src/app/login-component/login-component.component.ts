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
    var response = this.callApi(loginDto);
    console.log('login response ::', response);
    if(request.loginId=='admin' && request.password=='password'){
      console.log('login successful')
      this.loginSuccess = true;
      var credObj = {
        isLoginSuccessful: 'yes',
        userId: request.loginId,
        password: request.password,
        manager: 'primary manger',
        category: 'Handicraft',
        ttl: date.getTime()+(10 * 60 * 1000)
      }
      localStorage.setItem('cred', JSON.stringify(credObj));
    }
    else if(request.loginId=='slab' && request.password=='password'){
      console.log('login successful')
      this.loginSuccess = true;
      var credObj = {
        isLoginSuccessful: 'yes',
        userId: request.loginId,
        password: request.password,
        manager: 'primary manger',
        category: 'Handicraft',
        ttl: date.getTime()+(10 * 60 * 1000)
      }
      localStorage.setItem('cred', JSON.stringify(credObj));
    }
    else{
      console.log('login failed')
      localStorage.setItem('isLoginSuccessful','no')
    }
  }

  callApi(loginDto: any){
    return this.httpClient.get<any[]>('https://setu-crm.onrender.com/login',loginDto,{
      headers:
          new HttpHeaders(
            {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            }
          )
    })
  }

  getValuesForLogin(form: any){
    var loginObj = {
      loginId: form.value.loginId,
      password: form.value.password
    }
    return loginObj
  }

}
