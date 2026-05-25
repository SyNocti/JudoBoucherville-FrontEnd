import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { Administration } from '../../models/Administration';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-administration',
  imports: [CommonModule, PageTitleComponent, LoadingSpinnerComponent],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.css'
})
export class AdministrationComponent implements OnInit {
  administrationMembers: Administration[] = [];
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.loadAdministration();
  }

  private loadAdministration(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getAdministration().subscribe({
      next: (members) => {
        this.administrationMembers = members;
        this.loading = false;
        this.error = false;
      },
      error: (error) => {
        console.error('Error loading administration members:', error);
        this.loading = false;
        this.error = true;
        this.administrationMembers = [];
      }
    });
  }

  getProfileImage(member: Administration): string {
    if (member.photo) {
      return this.configService.getImageUrl(member.photo);
    }
    return this.getDefaultProfileImage();
  }

  getDefaultProfileImage(): string {
    return 'assets/images/default-profile.png';
  }

  onEmailClick(email: string): void {
    window.location.href = `mailto:${email}`;
  }

  navigateToPastPresidents(): void {
    this.router.navigate(['/club/presidents']);
  }
}
