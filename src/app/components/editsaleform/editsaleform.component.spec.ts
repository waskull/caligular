import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsaleformComponent } from './editsaleform.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SaleService } from '../../services/sale.service';
import { UserService } from '../../services/user.service';
import { InventoryService } from '../../services/inventory.service';

describe('EditsaleformComponent', () => {
  let component: EditsaleformComponent;
  let fixture: ComponentFixture<EditsaleformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditsaleformComponent, HttpClientTestingModule],
      providers: [SaleService, UserService, InventoryService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditsaleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
