import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';

interface Team {
  id: string;
  name: string;
  image: string;
  route: string;
  description: string;
  type: 'team';
}

@Component({
  selector: 'app-equipe-index',
  imports: [CommonModule, PageTitleComponent],
  templateUrl: './equipe-index.component.html',
  styleUrl: './equipe-index.component.css'
})
export class EquipeIndexComponent implements OnInit {
  teams: Team[] = [
    {
      id: 'canada',
      name: 'Équipe du Canada',
      image: '/assets/images/default-competition.png',
      route: '/athletes/canada',
      description: 'Nos athlètes représentant le Canada aux compétitions internationales',
      type: 'team'
    },
    {
      id: 'quebec',
      name: 'Équipe du Québec',
      image: '/assets/images/default-competition.png',
      route: '/athletes/quebec',
      description: 'Nos judokas sélectionnés pour représenter le Québec',
      type: 'team'
    },
    {
      id: 'sportetude',
      name: 'Équipe Sport-Études',
      image: '/assets/images/default-competition.png',
      route: '/athletes/sportetude',
      description: 'Programme combinant excellence académique et sportive',
      type: 'team'
    },
    {
      id: 'boucherville',
      name: 'Équipe Boucherville',
      image: '/assets/images/default-competition.png',
      route: '/athletes/boucherville',
      description: 'Nos athlètes locaux représentant notre club',
      type: 'team'
    },
    {
      id: 'kata',
      name: 'Équipe de Kata',
      image: '/assets/images/default-competition.png',
      route: '/athletes/kata',
      description: 'Spécialistes des formes traditionnelles du judo',
      type: 'team'
    },
    {
      id: 'veterans',
      name: 'Équipe vétérans',
      image: '/assets/images/default-competition.png',
      route: '/athletes/veterans',
      description: 'Nos athlètes vétérans, passionnés et expérimentés',
      type: 'team'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Component initialization
  }

  // Navigate to team page
  navigateToTeam(team: Team): void {
    this.router.navigate([team.route]);
  }
}
