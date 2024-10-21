import { Component, Input } from '@angular/core';

@Component({
  template: ` <p>{{ text }}</p> `,
  styles: [
    `
      p {
        padding: 24px;
        color: var(--ion-neutral-8);
      }
    `,
  ],
})
export class BodyMockComponent {
  @Input()
  text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisl nec nisl tincidunt, eget.`;
}
