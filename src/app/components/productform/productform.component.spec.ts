import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductformComponent } from './productform.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';

describe('ProductformComponent', () => {
  let component: ProductformComponent;
  let fixture: ComponentFixture<ProductformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductformComponent, HttpClientTestingModule],
      providers: [ProductService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
