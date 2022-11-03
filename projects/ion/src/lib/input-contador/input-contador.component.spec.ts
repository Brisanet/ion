import { async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from './../icon/icon.component';
import { render, fireEvent, screen } from '@testing-library/angular';
import { InputContadorComponent } from './input-contador.component';

const sut = async (customProps = {}) => {
  await render(InputContadorComponent, {
    componentProperties: customProps,
    imports: [CommonModule, FormsModule],
    declarations: [IonIconComponent],
  });
};

describe('InputCounter', () => {
  it('should render icon add increment', async () => {
    await sut();
    fireEvent.click(screen.getByTestId('iconAdd'));
    expect(screen.getByTestId('input')).toHaveAttribute(
      'ng-reflect-model',
      '1'
    );
  });

  it('should render icon sub decrement', async () => {
    await sut();
    fireEvent.click(screen.getByTestId('iconSub'));
    expect(screen.getByTestId('input')).toHaveAttribute(
      'ng-reflect-model',
      '0'
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
});
