import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { CeintureNoire } from '../models/ceintureNoire';
import { PageTitleComponent } from '../reusables/page-title/page-title.component';

@Component({
  selector: 'app-ceinture-noires',
  imports: [CommonModule, PageTitleComponent],
  templateUrl: './ceinture-noires.component.html',
  styleUrl: './ceinture-noires.component.css'
})
export class CeintureNoiresComponent implements OnInit {
  ceinturesNoires: CeintureNoire[] = [];
  loading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCeinturesNoires();
  }

  private loadCeinturesNoires(): void {
    this.loading = true;

    this.apiService.getCeinturesNoires().subscribe({
      next: (ceintures) => {
        this.ceinturesNoires = ceintures;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading ceintures noires:', error);
        this.loading = false;
      }
    });
  }

  getDecadeGroups(): { decade: string; belts: CeintureNoire[] }[] {
    const decades = new Map<string, CeintureNoire[]>();

    this.ceinturesNoires.forEach(belt => {
      const decade = `${Math.floor(belt.annee / 10) * 10}s`;
      if (!decades.has(decade)) {
        decades.set(decade, []);
      }
      decades.get(decade)!.push(belt);
    });

    return Array.from(decades.entries()).map(([decade, belts]) => ({
      decade,
      belts: belts.sort((a, b) => a.numero - b.numero)
    })).sort((a, b) => a.decade.localeCompare(b.decade));
  }
}
