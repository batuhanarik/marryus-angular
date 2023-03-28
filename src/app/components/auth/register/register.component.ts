import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { RegisterInput } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[AuthService]
})
export class RegisterComponent {
  loading: boolean = false;
  isWeddingPlaceOwner:boolean=false;
  form = this._fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(4)]],
    firstName: ['', [Validators.required,Validators.minLength(3)]],
    lastName: ['', [Validators.required,Validators.minLength(2)]],
    phoneNumber: ['', [Validators.required]],
    isWeddingPlaceOwner: [this.isWeddingPlaceOwner, [Validators.required]],

  });
  constructor(private _fb: FormBuilder, private _service: AuthService,private router:Router){
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.loading=true;
    this._service
    .register(this.form.value as RegisterInput)
    .pipe(
      catchError(() => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: `Beklenmedik bir hata oluştu!`,
          showConfirmButton: false,
          timer: 1500
        })
        return of();
      }),
    )
    .subscribe((res:any)=>{
      if (res.token!==null) {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: `Başarıyla Kayıt Olundu!`,
          showConfirmButton: false,
          timer: 1500
        }).finally(() => {
          this.loading=false;
          this.form.reset();
          this.router.navigateByUrl('/auth/login');
        })
      }
    });

  }
}
