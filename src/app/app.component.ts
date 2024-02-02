import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-side-forms';
  collapsed = true;
  loginSuccess = true;
  loginCred:any = "unauthenticated"
  public loginCompForm!: FormGroup;

  ngOnInit(): void {
    this.buildForm()
    this.cookieService.deleteAll();
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  constructor(private form:FormBuilder, private cookieService: CookieService){}

  buildForm(){
    this.loginCompForm = this.form.group({
      loginId: new FormControl(''),
      password: new FormControl('')
    })
  }

  login(form: any){
    var request = this.getValuesForLogin(form)
    //logic to check credentials on db
    console.log('cred :: ',request.loginId)
    //declare date and get current date time
    var date = new Date();
    //add 20 minutes to date
    date.setTime(date.getTime() + (45 * 60 * 1000));
    if(request.loginId=='admin' && request.password=='password'){
      console.log('login successful')
      this.loginSuccess = true;
      
      this.cookieService.set('isLoginSuccessful','true',{'expires' : date});
      this.cookieService.set('userId',request.loginId, {'expires' : date});
      this.cookieService.set('password',request.password, {'expires' : date});
      this.cookieService.set('role','admin', {'expires' : date});
    }
    else if(request.loginId=='slab' && request.password=='password'){
      console.log('login successful')
      this.loginSuccess = true;
      
      this.cookieService.set('isLoginSuccessful','true',{'expires' : date});
      this.cookieService.set('userId',request.loginId, {'expires' : date});
      this.cookieService.set('password',request.password, {'expires' : date});
      this.cookieService.set('role','slab_manager', {'expires' : date});
    }
    else{
      console.log('login failed')
      this.cookieService.set('isLoginSuccessful','false');
    }
  }

  getValuesForLogin(form: any){
    var loginObj = {
      loginId: form.value.loginId,
      password: form.value.password
    }
    return loginObj
  }

}
