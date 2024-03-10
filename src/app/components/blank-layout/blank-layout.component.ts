import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css'],
})
export class BlankLayoutComponent {
  showScrollButton: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = scrollY > innerHeight;
  }

  goToUp(): void {
    scrollTo(0, 0);
  }
}
