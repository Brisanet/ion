import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from '../icon/icon.component';
import { render, fireEvent, screen } from '@testing-library/angular';
import { InputContadorComponent } from './input-counter.component';
import { ButtonComponent } from '../button/button.component';
import { InfoBadgeComponent } from '../info-badge/info-badge.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { BadgeComponent } from '../badge/badge.component';

const sut = async (customProps = {}): Promise<void> => {
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
  beforeEach(async () => {
    await sut();
  });

  it('should increment to 1 when click in decrement', async () => {
    fireEvent.click(screen.getByTestId('iconSub'));
    expect(screen.getByTestId('input-count')).toHaveAttribute(
      'ng-reflect-model',
      '0'
    );
  });

  it('should keep 0 when click to decrement and is 0', async () => {
    fireEvent.click(screen.getByTestId('iconAdd'));
    fireEvent.click(screen.getByTestId('iconSub'));
    expect(screen.getByTestId('input-count')).toHaveAttribute(
      'ng-reflect-model',
      '0'
    );
  });

  it('should increment to 1 when click in increment', async () => {
    fireEvent.click(screen.getByTestId('iconAdd'));
    expect(screen.getByTestId('input-count')).toHaveAttribute(
      'ng-reflect-model',
      '1'
    );
  });

  it('should render input counter', async () => {
    expect(document.getElementById('input-count'));
  });

  it('should render input counter icon sub', async () => {
    expect(document.getElementById('ion-icon-sub')).toBeTruthy();
  });

  it('should render input counter icon add', async () => {
    expect(document.getElementById('ion-icon-add')).toBeTruthy();
  });

  it('should render with md size by default', async () => {
    expect(screen.getByTestId('iconAdd')).toHaveAttribute(
      'ng-reflect-size',
      'md'
    );
  });
});

describe('InputCounter / Size', () => {
  it('should render with small size', async () => {
    await sut({ InputSize: 'sm' });
    expect(screen.getByTestId('iconAdd')).toHaveAttribute(
      'ng-reflect-size',
      'sm'
    );
  });
});
