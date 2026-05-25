import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../reusables/page-title/page-title.component';

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

  introText: string = `Elit in aute excepteur aliqua magna dolor occaecat exercitation. Ex amet culpa ipsum proident velit velit reprehenderit officia cupidatat consequat veniam magna sit. Ullamco ipsum aliqua in velit. Dolore exercitation minim quis ipsum.`;

  historySections: HistorySection[] = [
    {
      title: "Occaecat culpa mollit quis ad mollit",
      content: `Nulla cillum elit mollit dolor nulla sit occaecat aute ipsum irure ex. Pariatur ad tempor in mollit amet aute duis sit anim. Consectetur commodo id consectetur exercitation consectetur eiusmod. Eu duis sunt aute id consectetur qui ullamco ipsum velit exercitation sint ea minim minim. Ipsum duis est minim duis non.`,
      image: '/assets/images/default-profile.png',
      imageAlt: '',
      imagePosition: 'right'
    },
    {
      title: "Aute aliqua deserunt anim nulla anim.",
      content: `Veniam enim id laboris duis proident nisi labore amet. Mollit esse sunt cupidatat anim consequat sit eu occaecat occaecat esse anim eiusmod tempor amet. Anim minim quis anim non eu ut sunt reprehenderit aliqua Lorem. Pariatur dolor ex ullamco in esse culpa laborum sunt sunt ad adipisicing qui ipsum. Dolor aliquip deserunt irure exercitation adipisicing.`,
      image: '/assets/images/default-competition.png',
      imageAlt: '',
      imagePosition: 'left'
    },
    {
      title: "Dolore veniam nisi laboris occaecat consequat cupidatat",
      content: `Elit duis Lorem ex duis elit nostrud ad. Eiusmod aute velit pariatur minim sint nulla. Velit proident velit cillum culpa aliquip sit esse duis non enim proident nisi ullamco.`,
      image: '/assets/images/default-profile.png',
      imageAlt: '',
      imagePosition: 'right'
    },
    {
      title: "Non tempor et ea veniam cupidatat ad Lorem enim aute do.",
      content: `Nisi ut ut et do sit reprehenderit enim minim voluptate reprehenderit ipsum nulla. Amet fugiat nostrud labore anim cupidatat ipsum enim amet. Id tempor non ex ullamco exercitation nulla. Enim sint laborum anim elit esse elit cupidatat non. In laborum cillum magna nostrud velit eiusmod qui ipsum qui ex. Exercitation labore consectetur ipsum eiusmod elit reprehenderit laborum. Do ex excepteur et in cupidatat ipsum nisi labore dolore irure veniam velit esse. Minim officia deserunt ipsum ullamco enim deserunt aliqua sunt. Ad dolore ipsum qui adipisicing cillum dolore laboris mollit occaecat. Sint enim amet excepteur et laborum cupidatat.`,
      image: '/assets/images/default-profile.png',
      imageAlt: '',
      imagePosition: 'left'
    },
    {
      title: "Magna cupidatat proident",
      content: `Ad quis nulla laborum exercitation ullamco quis sint. Pariatur proident aute aliquip ea officia irure consequat ad aliquip enim minim sunt culpa. Laborum irure mollit nisi sunt ea veniam officia ex ea sint duis est. Ad quis nulla laborum exercitation ullamco quis sint. Pariatur proident aute aliquip ea officia irure consequat ad aliquip enim minim sunt culpa.`,
      image: '/assets/images/default-competition.png',
      imageAlt: '',
      imagePosition: 'right'
    }
  ];

  achievements: string[] = [
    "Ullamco incididunt exercitation culpa ullamco.",
    "Consectetur dolor pariatur consequat quis minim labore.",
    "Adipisicing id labore deserunt ex.",
    "Ipsum tempor aute duis voluptate aute cupidatat aute reprehenderit.",
    "Eu non Lorem occaecat ut.",
    "Nulla dolore ex eiusmod non laborum laboris ullamco occaecat.."
  ];

  values: { title: string; description: string }[] = [
    {
      title: "Ju No Ri",
      description: "Principe de la souplesse : s'adapter à la force de l'autre plutôt que de lui résister."
    },
    {
      title: "Seiryoku Zenyo",
      description: "Utilisation optimale de l'énergie : ne jamais gaspiller d'effort inutilement."
    },
    {
      title: "Jita Kyoei",
      description: "En entraide et prospérité mutuelle : progresser ensemble dans le respect et la coopération."
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
