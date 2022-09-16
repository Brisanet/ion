import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonIconComponent } from '../icon/icon.component';
import { TabGroupComponent } from '../tab-group/tab-group.component';
import { SimpleMenuComponent } from './simple-menu.component';

describe('SimpleMenuComponent', () => {
  let component: SimpleMenuComponent;
  let fixture: ComponentFixture<SimpleMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleMenuComponent, IonIconComponent, TabGroupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
