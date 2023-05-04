import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';
import { LoginInput } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthService],
})
export class LoginComponent {
  form = this._fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  constructor(private _fb: FormBuilder, private _service: AuthService) {}

  submit() {
    if (this.form.invalid) {
      return;
    }

    this._service
      .login(this.form.value as LoginInput)
      .pipe(
        catchError((err) => {
          console.log(err.error.detail);
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: `Hatalı İstek`,
            showConfirmButton: false,
            timer: 1500,
          });
          return of();
        })
      )
      .subscribe((res: any) => {
        if (res.token !== null) {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: `Giriş Başarılı!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }
}
