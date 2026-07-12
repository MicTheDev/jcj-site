import { Component, afterNextRender, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class Navbar {
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  constructor() {
    afterNextRender(() => {
      const updateScrolled = () => this.scrolled.set(window.scrollY > 10);
      updateScrolled();
      window.addEventListener('scroll', updateScrolled, { passive: true });
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
