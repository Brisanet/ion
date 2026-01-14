import { fireEvent, render, screen } from '@testing-library/angular';
import { IonSidebarComponent } from './sidebar.component';
import { IonSidebarGroupComponent } from './sidebar-group/sidebar-group.component';
import { IonSidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { IonButtonComponent } from '../button/button.component';
import { IonIconComponent } from '../icon/icon.component';
import { SafeAny } from '../utils/safe-any';
import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

const defaultProps = {
  logo: 'logo.svg',
  items: [
    { title: 'Item 1', icon: 'box' },
    {
      title: 'Group 1',
      icon: 'star',
      options: [{ title: 'Item 2', icon: 'pencil' }],
    },
  ],
};

const sut = async (customProps: SafeAny = {}) => {
  return await render(IonSidebarComponent, {
    componentInputs: { ...defaultProps, ...customProps },
    imports: [
      CommonModule,
      IonButtonComponent,
      IonSidebarItemComponent,
      IonSidebarGroupComponent,
      IonIconComponent,
    ],
  });
};

describe('IonSidebarComponent', () => {
  it('should render the sidebar', async () => {
    await sut();
    expect(screen.getByTestId('ion-sidebar')).toBeInTheDocument();
  });

  it('should render the sidebar closed by default', async () => {
    await sut();
    const sidebar = screen.getByTestId('ion-sidebar');
    expect(sidebar).not.toHaveClass('ion-sidebar--opened');
  });

  it('should toggle sidebar when toggle button is clicked', async () => {
    const { fixture } = await sut();
    const toggleBtn = fixture.debugElement.query(
      By.css('[data-testid="sidebar-toggle"]')
    );
    toggleBtn.triggerEventHandler('ionOnClick', null);
    fixture.detectChanges();
    TestBed.flushEffects();

    const sidebar = screen.getByTestId('ion-sidebar');
    expect(sidebar).toHaveClass('ion-sidebar--opened');

    toggleBtn.triggerEventHandler('ionOnClick', null);
    fixture.detectChanges();
    TestBed.flushEffects();
    expect(sidebar).not.toHaveClass('ion-sidebar--opened');
  });

  it('should render items when opened', async () => {
    // Open the sidebar
    const { fixture } = await sut();
    const toggleBtn = fixture.debugElement.query(
      By.css('[data-testid="sidebar-toggle"]')
    );
    toggleBtn.triggerEventHandler('ionOnClick', null);
    fixture.detectChanges();
    TestBed.flushEffects();

    expect(screen.getByText('Item 1')).toBeVisible();
    expect(screen.getByText('Group 1')).toBeVisible();
  });

  it('should render in shrink mode when shrinkMode is true', async () => {
    await sut({ shrinkMode: true });
    const sidebar = screen.getByTestId('ion-sidebar');
    expect(sidebar).toHaveClass('ion-sidebar--shrinked');
  });

  it('should emit ionOnSidebarToggle when toggled', async () => {
    const { fixture } = await sut();
    const component = fixture.componentInstance;
    const emitSpy = jest.spyOn(component.ionOnSidebarToggle, 'emit');

    const toggleBtn = fixture.debugElement.query(
      By.css('[data-testid="sidebar-toggle"]')
    );
    toggleBtn.triggerEventHandler('ionOnClick', null);
    fixture.detectChanges();
    TestBed.flushEffects();

    expect(emitSpy).toHaveBeenCalledWith(true);
  });
});
