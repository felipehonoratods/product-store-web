import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { passwordWatchValidator } from '../../shared/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  }, {
    validators: passwordWatchValidator
  });

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) { }

  submitDetails() {
    const postData = { ...this.registerForm.value }
    delete postData.confirmPassword;
    this.authService.registerUser(postData as User).subscribe(res => {
      console.log(res)
      this._snackBar.open('sucesso!', undefined, {
        horizontalPosition: 'center', verticalPosition: 'top', duration: 5000
      })
      this.router.navigate(['/login'])
    }, err =>{
      console.log(err)
      this._snackBar.open('erro!', undefined, {
        horizontalPosition: 'center', verticalPosition: 'top', duration: 5000
      })
    })
  }
}
