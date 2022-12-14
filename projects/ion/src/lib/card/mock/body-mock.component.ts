import { Component, Input } from '@angular/core';

@Component({
  template: `
    <p style="padding: 24px">
      {{ text }}
    </p>
  `,
})
export class BodyMockComponent {
  @Input()
  text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisl nec nisl tincidunt, eget.`;
}
