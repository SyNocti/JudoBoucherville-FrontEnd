import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../reusables/page-title/page-title.component';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, PageTitleComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
    // Component initialization
  }

  // Open phone dialer
  callPhone(): void {
    window.open('tel:4506551888', '_self');
  }

  // Open email client
  sendEmail(): void {
    window.open('mailto:info@judoboucherville.com', '_self');
  }

  // Open Google Maps
  openMap(): void {
    window.open('https://maps.app.goo.gl/71nY77AnHG6WVmH69', '_blank');
  }

  // Open social media links
  openSocialLink(platform: string): void {
    const links = {
      facebook: 'https://www.facebook.com/clubdejudoboucherville/',
      instagram: 'https://www.instagram.com/judoboucherville',
      twitter: 'https://x.com/BouchervilleJ',
      tiktok: 'https://www.tiktok.com/@judoboucherville',
      youtube: 'https://www.youtube.com/channel/UCxlMYl9hl3mswddZXTbp83Q'
    };

    const url = links[platform as keyof typeof links];
    if (url) {
      window.open(url, '_blank');
    }
  }
}
