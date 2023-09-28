import { screen, fireEvent } from '@testing-library/angular';

import { Component, NgModule } from '@angular/core';
import { IonCollapseModule } from './collapse.module';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { IonIconModule } from '../icon/icon.module';

@Component({
  template: `<ion-collapse [name]="name">
    <p data-testID="ion-collapse__main-paragraph">Context Main</p>
  </ion-collapse>`,
})
class CollapseTestComponent {
  name = '';
}

@Component({
  template: `<ion-collapse [templateHeader]="customHeader">
      <p data-testID="ion-collapse__main-paragraph">Context Main</p>
    </ion-collapse>
    <ng-template #customHeader>
      <div data-testId="ion-collapse__header-custom">
        Custom template header
        <ion-icon type="zoom-in"></ion-icon></div
    ></ng-template>`,
})
class CollapseWithTemplateHeaderTestComponent {}

@NgModule({
  declarations: [
    CollapseTestComponent,
    CollapseWithTemplateHeaderTestComponent,
  ],
  imports: [IonCollapseModule, IonIconModule],
})
class CollapseTestModule {}

describe('IonCollapse', () => {
  let collapseTestComponent!: CollapseTestComponent;
  let fixture!: ComponentFixture<CollapseTestComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CollapseTestModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CollapseTestComponent);
    collapseTestComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    fixture.destroy();
  });

  it('should render ion-collapse', async () => {
    expect(screen.getByTestId('ion-collapse')).toBeTruthy();
  });

  it('should render ion-collapse with name Brisanet', async () => {
    collapseTestComponent.name = 'Brisanet';
    fixture.detectChanges();
    expect(screen.getByTestId('ion-collapse__header-name')).toHaveTextContent(
      'Brisanet'
    );
  });

  it('should render main when clicking on header', async () => {
    const header = screen.getByTestId('ion-collapse__header-name');
    fireEvent.click(header);
    fixture.detectChanges();
    expect(screen.getByTestId('ion-collapse__main')).toBeTruthy();
    expect(
      screen.getByTestId('ion-collapse__main-paragraph')
    ).toHaveTextContent('Context Main');
  });

  it('should not render main when clicking on header twice', async () => {
    const header = screen.getByTestId('ion-collapse__header-name');
    fireEvent.click(header);
    fireEvent.click(header);
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-collapse__main')).not.toBeTruthy();
  });
});

describe('IonCollapse - template header', () => {
  let collapseWithTemplateHeaderTestComponent!: CollapseWithTemplateHeaderTestComponent;
  let fixture!: ComponentFixture<CollapseWithTemplateHeaderTestComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CommonModule, CollapseTestModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CollapseWithTemplateHeaderTestComponent);
    collapseWithTemplateHeaderTestComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    fixture.destroy();
  });

  it('should render template header', async () => {
    const headerCustom = await screen.getByTestId(
      'ion-collapse__header-custom'
    );
    expect(headerCustom).toBeTruthy();
    expect(headerCustom).toHaveTextContent('Custom template header');
    expect(document.getElementById('ion-icon-zoom-in')).toBeTruthy();
  });
});
