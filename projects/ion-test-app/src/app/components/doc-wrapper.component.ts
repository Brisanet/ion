import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { IonSidebarComponent, SidebarItem } from 'ion';

type SidebarItemWithOptions = SidebarItem & { options?: SidebarItem[] };

@Component({
  selector: 'app-doc-wrapper',
  standalone: true,
  imports: [CommonModule, RouterOutlet, IonSidebarComponent],
  templateUrl: './doc-wrapper.component.html',
  styleUrls: ['./doc-wrapper.component.scss'],
})
export class DocWrapperComponent {
  sidebarItems: SidebarItemWithOptions[] = [
    {
      title: 'Home',
      icon: 'home',
      action: () => this.router.navigate(['/']),
    },
    {
      title: 'Components',
      icon: 'box',
      options: [
        {
          title: 'Buttons',
          icon: 'click',
          action: () => this.router.navigate(['/components/buttons']),
        },
        {
          title: 'Popover',
          icon: 'message-alert',
          action: () => this.router.navigate(['/components/popover']),
        },
      ],
    },
  ];

  constructor(private router: Router) {}
}
