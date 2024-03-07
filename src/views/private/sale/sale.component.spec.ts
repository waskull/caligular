import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleComponent } from './sale.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SaleService } from '../../../services/sale.service';

describe('SaleComponent', () => {
  let component: SaleComponent;
  let fixture: ComponentFixture<SaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleComponent,HttpClientTestingModule],
      providers:[SaleService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
