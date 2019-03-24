import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SborkaCommonComponent } from './sborka-common.component';

describe('SborkaCommonComponent', () => {
  let component: SborkaCommonComponent;
  let fixture: ComponentFixture<SborkaCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SborkaCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SborkaCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
