import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services';
import { Subscription } from 'rxjs';
import { User } from '../models';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('header') header: ElementRef;
  isBrowser: boolean;
  scrollListener: (() => void) | undefined;
  user: User | null;
  private userSubscription: Subscription;

  constructor(
    @Inject(PLATFORM_ID) platformId,
    private authService: AuthService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.userSubscription = this.authService.getUser().subscribe((user) => this.user = user);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.scrollListener = () => {
        this.header.nativeElement.style.left = `${-window.scrollX}px`;
      };
      window.addEventListener('scroll', this.scrollListener);
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }
}
