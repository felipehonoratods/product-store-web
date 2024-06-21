import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor (private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {}

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.loginUser(email as string).subscribe(res => {
      if (res.length > 0 && res[0].password === password) {
        sessionStorage.setItem('email', email as string);
        this.router.navigate(['/home']);
      } else {
        this._snackBar.open('erro ao logar!', undefined, {
          horizontalPosition: 'center', verticalPosition: 'top', duration: 5000
        })
      }
    })
  }
}
