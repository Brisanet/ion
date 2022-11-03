import { async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from './../icon/icon.component';
import { render, fireEvent, screen } from '@testing-library/angular';
import { InputContadorComponent } from './input-contador.component';
import { ButtonComponent } from '../button/button.component';
import { InfoBadgeComponent } from '../info-badge/info-badge.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { BadgeComponent } from '../badge/badge.component';

const sut = async (customProps = {}) => {
  await render(InputContadorComponent, {
    componentProperties: customProps,
    imports: [CommonModule, FormsModule],
    declarations: [
      IonIconComponent,
      ButtonComponent,
      BadgeComponent,
      InfoBadgeComponent,
      DropdownComponent,
    ],
  });
};

describe('InputCounter', () => {
  it('should increment to 1 when click in decrement', async () => {
    await sut();
    fireEvent.click(screen.getByTestId('iconSub'));
    expect(screen.getByTestId('input')).toHaveAttribute(
      'ng-reflect-model',
      '0'
    );
  });

  it('should keep 0 when click to decrement and is 0', async () => {
    await sut();
    fireEvent.click(screen.getByTestId('iconAdd'));
    fireEvent.click(screen.getByTestId('iconSub'));
    expect(screen.getByTestId('input')).toHaveAttribute(
      'ng-reflect-model',
      '0'
    );
  });

  it('should increment to 1 when click in increment', async () => {
    await sut();
    fireEvent.click(screen.getByTestId('iconAdd'));
    expect(screen.getByTestId('input')).toHaveAttribute(
      'ng-reflect-model',
      '1'
    );
  });

  it('should render input counter', async () => {
    await sut();
    const element = document.getElementById('input-test');
    expect(element);
  });

  it('should render input counter icon sub', async () => {
    await sut();
    const element = document.getElementById('ion-icon-sub');
    expect(element).toBeTruthy();
  });

  it('should render input counter icon add', async () => {
    await sut();
    const element = document.getElementById('ion-icon-add');
    expect(element).toBeTruthy();
  });

  it('should render with md size by default', async () => {
    await sut();
    screen.debug();
    expect(screen.getByTestId('iconAdd')).toHaveAttribute(
      'ng-reflect-size',
      'md'
    );
  });

  it('should render with small size', async () => {
    await sut({ size: 'sm' });
    expect(screen.getByTestId('iconAdd')).toHaveAttribute(
      'ng-reflect-size',
      'sm'
    );
  });
});
