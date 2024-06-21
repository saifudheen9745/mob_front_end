import { Component, OnInit, inject } from '@angular/core';
import { AdminAuthService } from '../../services/admin-auth/admin-auth.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  imports:[ReactiveFormsModule]
})
export class AdminLoginComponent implements OnInit {

  public adminAuthService = inject(AdminAuthService);
  private fb = inject(FormBuilder);

  heading:string = '# ';

  adminLoginForm = this.fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })

  ngOnInit() {
    this.appendHeading();
  }

  appendHeading(){
    const dummyHeading = "Admin Login"
    dummyHeading.split('').forEach((char,i) => {
      setTimeout(() => this.heading+=char, i*40)
    })
  }

  doLogin(loginFormData:FormGroup){
    loginFormData.markAllAsTouched()
    if(loginFormData.invalid){
      return;
    }
    this.adminAuthService.adminDoLogin(loginFormData.value)
  }

}
