import { render, fireEvent, screen } from '@testing-library/angular';
import { Component } from '@angular/core';
import { IonSharedModule } from '../public-api';

@Component({
  template: `
    <div (clickOutside)="onClickOutside()" data-testid="directive-element">
      <p>Click outside me</p>
      <ion-icon type="pencil"></ion-icon>
    </div>
    <span data-testid="outside-span">{{ clicked ? 'clicked' : 'not' }}</span>
  `,
})
class TestComponent {
  public clicked = false;

  onClickOutside(): void {
    this.clicked = true;
  }
}

const sut = async (): Promise<void> => {
  await render(TestComponent, {
    imports: [IonSharedModule],
  });
};

describe('ClickOutsideDirective', () => {
  beforeEach(async () => {
    await sut();
  });

  it('should run event when click outside element', async () => {
    const spanOutside = screen.getByTestId('outside-span');
    fireEvent.click(spanOutside);
    fireEvent.click(spanOutside);
    expect(spanOutside).toHaveTextContent('clicked');
  });

  it('should not run event when click on element', async () => {
    const elementWithDirective = screen.getByTestId('directive-element');
    fireEvent.click(elementWithDirective);
    fireEvent.click(elementWithDirective);
    expect(screen.getByTestId('outside-span')).not.toHaveTextContent('clicked');
  });
});
