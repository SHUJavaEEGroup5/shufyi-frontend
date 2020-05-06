import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {

  @ViewChild('header') public header: ElementRef;
  isBrowser: boolean;
  scrollListenerRef: (() => void) | undefined;

  constructor(@Inject(PLATFORM_ID) platformId) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.scrollListenerRef = () => {
        this.header.nativeElement.style.left = `${-window.scrollX}px`;
      };
      window.addEventListener('scroll', this.scrollListenerRef);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.scrollListenerRef);
    }
  }

}
