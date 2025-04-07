import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePswdContent: boolean = true;

  constructor(fb: FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar) {
    this.loginForm = fb.group({
      email: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required]),
    });
  }

  login () {
    let loginInfo = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }

    this.apiService.login(loginInfo).subscribe({
      next: res => {
        if(res == 'not found')
          this.snackBar.open('Credentials are invalid!', 'OK');
        else if(res == 'unapproved')
          this.snackBar.open('Your account is not yet approved by the Admin!', 'OK');
        else
          localStorage.setItem('access_token', res);
      }
     })
  }
}
