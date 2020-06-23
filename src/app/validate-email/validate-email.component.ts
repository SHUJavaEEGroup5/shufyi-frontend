import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, PersonalService, RegisterService, User } from '../shared';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss'],
})
export class ValidateEmailComponent implements OnInit, OnDestroy {
  usernameForm: FormGroup;
  public isVerified: boolean;
  public isLoading: boolean;
  public isSetUsername: boolean;
  user: User | null;
  private token: string;
  private userSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registerService: RegisterService,
    private personalService: PersonalService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.userSubscription = this.authService.getUser().subscribe((user) => this.user = user);
    this.usernameForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.isVerified = false;
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
    });
    this.registerService
      .validateEmail(this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log(data);
          this.authService.saveToken(this.token);
          this.authService.setUser(data);
          this.isVerified = true;
          this.snackBar.open('验证成功，请继续填写兴趣!', undefined, { duration: 2000 });
        },
        (err: HttpErrorResponse) => {
          this.isLoading = false;
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

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  submitUsername() {
    this.personalService.setUserName(this.usernameForm.value).subscribe(
      (data) => {
        this.isLoading = false;
        console.log(data);
        this.isSetUsername = true;
        // 更新username
        this.user.username = this.usernameForm.value;
        this.authService.setUser(this.user);
        this.router.navigateByUrl('/', { replaceUrl: true }).then(() => {
          this.snackBar.open('设置成功 开始探索吧！', undefined, { duration: 2000 });
        });
      },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
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
