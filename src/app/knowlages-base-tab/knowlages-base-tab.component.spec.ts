import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowlagesBaseTabComponent } from './knowlages-base-tab.component';

describe('KnowlagesBaseTabComponent', () => {
  let component: KnowlagesBaseTabComponent;
  let fixture: ComponentFixture<KnowlagesBaseTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowlagesBaseTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowlagesBaseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
