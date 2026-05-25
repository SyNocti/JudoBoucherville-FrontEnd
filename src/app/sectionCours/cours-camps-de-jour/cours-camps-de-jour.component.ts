import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CampsDeJour } from '../../models/CampsDeJour';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cours-camps-de-jour',
  imports: [CommonModule, PageTitleComponent, LoadingSpinnerComponent],
  templateUrl: './cours-camps-de-jour.component.html',
  styleUrl: './cours-camps-de-jour.component.css'
})
export class CoursCampsDeJourComponent implements OnInit {
  campsDeJour: CampsDeJour | null = null;
  loading: boolean = true;
  error: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCampsDeJour();
  }

  private loadCampsDeJour(): void {
    this.loading = true;
    this.error = false;
    console.log('Loading CampsDeJour data...');

    this.apiService.getCampsDeJour().subscribe({
      next: (data) => {
        console.log('CampsDeJour data received:', data);
        this.campsDeJour = data;
        this.loading = false;
        this.error = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading Camps de Jour:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        this.loading = false;
        this.error = true;
        this.campsDeJour = null;
      }
    });
  }
}
