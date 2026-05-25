import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CeintureNoire } from '../../models/CeintureNoire';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';
import { LoadingSpinnerComponent } from '../../reusables/loading-spinner/loading-spinner.component';

interface LogoTimeline {
  imageUrl: string;
  startYear: string;
  endYear: string;
}

@Component({
  selector: 'app-ceinture-noires',
  imports: [CommonModule, PageTitleComponent, LoadingSpinnerComponent],
  templateUrl: './ceinture-noires.component.html',
  styleUrl: './ceinture-noires.component.css'
})
export class CeintureNoiresComponent implements OnInit {
  ceinturesNoires: CeintureNoire[] = [];
  loading: boolean = true;
  error: boolean = false;

  // Club logos timeline
  logosTimeline: LogoTimeline[] = [
    {
      imageUrl: '/assets/images/logos/vieux-1970.png',
      startYear: '1970',
      endYear: '1981'
    },
    {
      imageUrl: '/assets/images/logos/vieux-1982.png',
      startYear: '1982',
      endYear: '1994'
    },
    {
      imageUrl: '/assets/images/logos/vieux-1995.png',
      startYear: '1995',
      endYear: '2006'
    },
    {
      imageUrl: '/assets/images/logos/logo-medium.png',
      startYear: '2007',
      endYear: 'Présent'
    }
  ];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCeinturesNoires();
  }

  private loadCeinturesNoires(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getCeinturesNoires().subscribe({
      next: (ceintures) => {
        this.ceinturesNoires = ceintures;
        this.loading = false;
        this.error = false;
      },
      error: (error) => {
        console.error('Error loading ceintures noires:', error);
        this.loading = false;
        this.error = true;
        this.ceinturesNoires = [];
      }
    });
  }

  getDecadeGroups(): { decade: string; belts: CeintureNoire[] }[] {
    const decades = new Map<number, CeintureNoire[]>();

    this.ceinturesNoires.forEach(belt => {
      const decadeNum = Math.floor(belt.annee / 10) * 10;
      if (!decades.has(decadeNum)) {
        decades.set(decadeNum, []);
      }
      decades.get(decadeNum)!.push(belt);
    });

    type DecadeGroupInternal = { decadeNum: number; decade: string; belts: CeintureNoire[] };

    return Array.from(decades.entries())
      .map(([decadeNum, belts]): DecadeGroupInternal => ({
        decadeNum,
        decade: `Les années ${decadeNum}`,
        belts: belts.sort((a, b) => {
          if (b.numero !== a.numero) return b.numero - a.numero;
          return b.annee - a.annee;
        })
      }))
      .sort((a, b) => b.decadeNum - a.decadeNum)
      .map(({ decade, belts }) => ({ decade, belts }));
  }
}
