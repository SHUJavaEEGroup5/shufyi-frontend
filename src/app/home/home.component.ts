import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  emailVerify() {
    this.router.navigateByUrl('/verify/123456789', { replaceUrl: true }).then((r) => {});
  }

  personalPage() {
    this.router.navigateByUrl('/people/123456', { replaceUrl: true }).then((r) => {});
  }
}
