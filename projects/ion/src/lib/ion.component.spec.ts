import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonComponent } from './ion.component';

describe('IonComponent', () => {
  let component: IonComponent;
  let fixture: ComponentFixture<IonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
