import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTabComponent } from './orders-tab.component';
import { OrdersStore } from './orders.store';
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('OrdersTabComponent', () => {
  let component: OrdersTabComponent;
  let fixture: ComponentFixture<OrdersTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersTabComponent ],
      providers: [ OrdersStore ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
