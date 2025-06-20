import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Administration } from '../models/administration';
import { PageTitleComponent } from '../reusables/page-title/page-title.component';

@Component({
  selector: 'app-administration',
  imports: [CommonModule, PageTitleComponent],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.css'
})
export class AdministrationComponent implements OnInit {
  administrationMembers: Administration[] = [];
  loading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadAdministration();
  }

  private loadAdministration(): void {
    this.loading = true;

    this.apiService.getAdministration().subscribe({
      next: (members) => {
        this.administrationMembers = members;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading administration:', error);
        this.loading = false;
      }
    });
  }

  getProfileImage(member: Administration): string {
    return member.photo || '/assets/images/default-profile.png';
  }

  onEmailClick(email: string): void {
    window.location.href = `mailto:${email}`;
  }
}
