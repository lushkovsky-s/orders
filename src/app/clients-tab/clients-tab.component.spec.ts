import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsTabComponent } from './clients-tab.component';

describe('ClientsTabComponent', () => {
  let component: ClientsTabComponent;
  let fixture: ComponentFixture<ClientsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
