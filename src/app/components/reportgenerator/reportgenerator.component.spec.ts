import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportgeneratorComponent } from './reportgenerator.component';
import { OrderService } from '../../services/order.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SaleService } from '../../services/sale.service';

describe('ReportgeneratorComponent', () => {
  let component: ReportgeneratorComponent;
  let fixture: ComponentFixture<ReportgeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportgeneratorComponent, HttpClientTestingModule],
      providers: [SaleService, OrderService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
