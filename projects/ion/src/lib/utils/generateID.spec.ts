import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { generateIDs } from './generateID';

const prefix = 'prefix-';
const generatedId = prefix + 1;
const dataTestid = 'element';

const sut = (): string => {
  return generateIDs(prefix, dataTestid);
};

describe('Generate IDs', () => {
  let fixture: ComponentFixture<MockComponent>;

  @Component({
    template: ` <div data-testid="element"></div> `,
  })
  class MockComponent {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
    });

    fixture = TestBed.createComponent(MockComponent);
  });

  afterEach(() => {
    fixture.detectChanges();
  });

  it('should create instance', () => {
    const element = sut();

    expect(element).toBeTruthy();
  });
  it('should contain id 1', () => {
    const element = sut();
    expect(element).toEqual(generatedId);
  });
});
