import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../reusables/page-title/page-title.component';

@Component({
  selector: 'app-boutique',
  imports: [CommonModule, PageTitleComponent],
  templateUrl: './boutique.component.html',
  styleUrl: './boutique.component.css'
})
export class BoutiqueComponent {

}