import { Component } from '@angular/core';

@Component({
  selector: 'app-card-body',
  standalone: true,
  template: `
    <div style="padding: 16px;">
      <p>This is a dynamic body component content.</p>
      <ul>
        <li>Feature 1</li>
        <li>Feature 2</li>
      </ul>
    </div>
  `,
})
export class CardBodyComponent {}
