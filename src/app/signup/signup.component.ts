import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RegisterService} from '../shared/services/register.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../shared/services';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  @ViewChild('campusEmailAccount') emailRef: ElementRef<HTMLInputElement>;
  @ViewChild('password') passwordRef: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.registerForm = this.formBuilder.group({
      campusEmailAccount: ['', Validators.required],
      campusEmailDomain: '',
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.registerForm.disable();
      this.registerService
        .register(this.registerForm.value)
        .subscribe(
          (data) => {
            console.log(data);
            this.authService.saveToken(data.token);
            this.authService.setUser(data.user);
            this.router.navigateByUrl('/', { replaceUrl: true }).then(() => {
              this.snackBar.open('注册成功！请验证邮箱', undefined, { duration: 2000 });
            });
          },
          (err: HttpErrorResponse) => {
            this.registerForm.enable();
            this.passwordRef.nativeElement.select();
            this.passwordRef.nativeElement.focus();
            console.log(err);
            if (err.status === 400) {
              this.snackBar.open(err.error.message, undefined, { duration: 5000 });
            } else if (err.status > 0) {
              this.snackBar.open(`${err.statusText} (${err.status})`, undefined, { duration: 5000 });
            } else {
              this.snackBar.open('出现了网络错误，请稍后重试…', undefined, { duration: 5000 });
            }
          },
        );
    }
  }

  ngOnInit() {}
}
