import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  disabled: boolean = true;
  user: UserModel;
  userLoaded = false;
  userUpdateForm: FormGroup;
  passwordUpdateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {
    this.userUpdateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.userService
      .get(this.authService.claims?.userId)
      .subscribe((res: any) => {
        if (res.success) {
          this.user = res.data;
          this.createUserUpdateForm();
          this.userLoaded = true;
        }
      });
  }
  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }
  updateUser() {
    this.userService
      .updateUser(this.userUpdateForm.value)
      .subscribe((res: any) => {
        if (res.success) {
          this.toastrService.success(res.message);
        }
      });
  }
}
