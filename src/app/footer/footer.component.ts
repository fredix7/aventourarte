import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/aventourarte', icon: '📸' },
    { name: 'Facebook', url: 'https://www.facebook.com/aventourarte', icon: '📘' },
    { name: 'Twitter', url: 'https://www.twitter.com/aventourarte', icon: '🐦' }
  ];
}
