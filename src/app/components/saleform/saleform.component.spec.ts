import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleformComponent } from './saleform.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SaleService } from '../../services/sale.service';
import { UserService } from '../../services/user.service';
import { InventoryService } from '../../services/inventory.service';

describe('SaleformComponent', () => {
  let component: SaleformComponent;
  let fixture: ComponentFixture<SaleformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleformComponent, HttpClientTestingModule],
      providers: [SaleService, UserService, InventoryService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
