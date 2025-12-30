import { Component } from '@angular/core';
import { IonHeadingComponent, IonButtonComponent, IonIconComponent } from 'ion';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonHeadingComponent, IonButtonComponent, IonIconComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
