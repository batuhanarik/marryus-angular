import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  isFormClicked: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _service: AuthService,
    private toastrService: ToastrService
  ) {}

  get getControls() {
    return this.form.controls;
  }

  submit() {
    this.isFormClicked = true;
    if (this.form.invalid) {
      if (this.getControls.email.invalid) {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: `Mail adresinizin doğruluğunu kontrol ediniz.`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (this.getControls.password.invalid) {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: `Şifre alanı boş geçilemez.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      console.log(this.form.value);
      return;
    }

    this._service
      .login(this.form.value as LoginInput)
      .pipe(
        catchError((err) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: `${err.error.detail}`,
            showConfirmButton: false,
            timer: 1500,
          });
          return of(null);
        })
      )
      .subscribe((res: any) => {
        if (res.token) {
          if (res.token != null) this.toastrService.success('Giriş Başarılı.');
        }
      });
  }
}
