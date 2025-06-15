import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Swiper modules
import { register } from 'swiper/element/bundle';
register();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
