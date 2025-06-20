import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../reusables/page-title/page-title.component';

interface HistorySection {
  title: string;
  content: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
}

@Component({
  selector: 'app-histoire',
  imports: [CommonModule, PageTitleComponent],
  templateUrl: './histoire.component.html',
  styleUrl: './histoire.component.css'
})
export class HistoireComponent {

  introText: string = `Le Club de judo de Boucherville a une riche histoire qui s'étend sur plusieurs décennies. 
  Fondé avec la passion de promouvoir les valeurs du judo et de former des athlètes d'exception, 
  notre club est devenu une référence dans la région de la Montérégie.`;

  historySections: HistorySection[] = [
    {
      title: "Les débuts (1970-1980)",
      content: `Le Club de judo de Boucherville voit le jour au début des années 1970, grâce à l'initiative d'un groupe de passionnés d'arts martiaux. 
      Dans un petit dojo improvisé, les premiers membres s'entraînent avec détermination, posant les bases de ce qui deviendra 
      l'un des clubs de judo les plus respectés du Québec. L'accent est mis dès le départ sur l'enseignement des valeurs traditionnelles 
      du judo : respect, discipline, persévérance et humilité.`,
      image: '/assets/images/forTesting/ana.jpg',
      imageAlt: 'Les débuts du club dans les années 1970',
      imagePosition: 'right'
    },
    {
      title: "Expansion et reconnaissance (1980-1990)",
      content: `Les années 1980 marquent une période d'expansion significative pour le club. L'augmentation du nombre de membres 
      nécessite un déménagement vers des installations plus spacieuses. C'est à cette époque que le club commence à se faire 
      connaître sur la scène provinciale, avec ses premiers athlètes participant aux championnats du Québec. 
      L'excellence de l'enseignement et la qualité de la formation commencent à porter leurs fruits.`,
      image: '/assets/images/forTesting/act1-H.jpg',
      imageAlt: 'Expansion du club dans les années 1980',
      imagePosition: 'left'
    },
    {
      title: "L'âge d'or (1990-2000)",
      content: `Les années 1990 représentent véritablement l'âge d'or du Club de judo de Boucherville. 
      Nos athlètes brillent sur la scène nationale et internationale, ramenant de nombreuses médailles des compétitions prestigieuses. 
      Le club développe un programme d'élite qui attire des judokas de partout au Québec. 
      C'est durant cette décennie que plusieurs de nos athlètes intègrent l'équipe nationale du Canada.`,
      image: '/assets/images/forTesting/act2-V.jpg',
      imageAlt: 'Athlètes du club dans les années 1990',
      imagePosition: 'right'
    },
    {
      title: "Modernisation et innovation (2000-2010)",
      content: `Le nouveau millénaire apporte avec lui une modernisation complète du club. 
      Adoption de nouvelles méthodes d'entraînement, intégration de la technologie dans l'enseignement, 
      et développement de programmes spécialisés pour différents groupes d'âge. 
      Le club investit également dans des équipements de pointe et améliore considérablement ses installations.`,
      image: '/assets/images/forTesting/comp1-V.jpg',
      imageAlt: 'Modernisation des installations dans les années 2000',
      imagePosition: 'left'
    },
    {
      title: "Excellence continue (2010 à aujourd'hui)",
      content: `Aujourd'hui, le Club de judo de Boucherville continue de rayonner à travers ses nombreux programmes : 
      judo récréatif, compétition, sport-études, et formation d'entraîneurs. 
      Nos athlètes participent régulièrement aux championnats nationaux et internationaux, 
      perpétuant la tradition d'excellence qui caractérise notre club depuis ses débuts. 
      Nous demeurons fidèles à notre mission : développer le potentiel de chaque judoka dans le respect des valeurs traditionnelles du judo.`,
      image: '/assets/images/forTesting/comp2-H.jpg',
      imageAlt: 'Le club aujourd\'hui',
      imagePosition: 'right'
    }
  ];

  achievements: string[] = [
    "Plus de 50 années d'excellence dans l'enseignement du judo",
    "Nombreux champions provinciaux et nationaux formés",
    "Plusieurs athlètes ayant représenté le Canada à l'international",
    "Centre de formation reconnu par Judo Canada",
    "Plus de 1000 membres formés depuis la création",
    "Programmes adaptés à tous les âges et niveaux"
  ];

  values: { title: string; description: string }[] = [
    {
      title: "Respect",
      description: "Le respect mutuel entre les pratiquants, envers les instructeurs et les traditions du judo."
    },
    {
      title: "Discipline",
      description: "La rigueur dans l'entraînement et la constance dans l'effort pour atteindre l'excellence."
    },
    {
      title: "Persévérance",
      description: "La détermination à surmonter les obstacles et à progresser continuellement."
    },
    {
      title: "Humilité",
      description: "La modestie dans la victoire et la dignité dans la défaite."
    }
  ];

  // Method to check if image is horizontal based on filename or load event
  onImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.naturalWidth > img.naturalHeight) {
      // Horizontal image
      img.classList.add('horizontal-image');
    } else {
      // Vertical image
      img.classList.add('vertical-image');
    }
  }
}
