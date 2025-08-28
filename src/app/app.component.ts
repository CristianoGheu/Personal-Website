import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  private themeKey = 'saved-theme';
  private iconKey = 'saved-icon';
  isLightTheme = true;

  constructor(private renderer: Renderer2) {}

  toggleTheme(): void {
    this.isLightTheme = !this.isLightTheme;
    const isDarkTheme = document.body.classList.toggle('dark-theme', !this.isLightTheme);
    const newIcon = isDarkTheme ? 'moon' : 'sun';

    localStorage.setItem(this.themeKey, isDarkTheme ? 'dark' : 'light');
    localStorage.setItem(this.iconKey, newIcon);
  }

  ngOnInit(): void {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    const savedIcon = localStorage.getItem(this.iconKey) || 'sun';

    if (savedTheme === 'dark') {
      this.renderer.addClass(document.body, 'dark-theme');
      this.isLightTheme = false;
    }

    const themeBtn = document.querySelector('.theme-btn');
    if (themeBtn) {
      themeBtn.classList.add(savedIcon);
    }
  }
}
