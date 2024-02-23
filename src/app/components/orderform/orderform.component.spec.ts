import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderformComponent } from './orderform.component';
import { OrderService } from '../../services/order.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InventoryService } from '../../services/inventory.service';

describe('OrderformComponent', () => {
  let component: OrderformComponent;
  let fixture: ComponentFixture<OrderformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderformComponent, HttpClientTestingModule],
      providers: [OrderService, InventoryService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
