import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderComponent } from './provider.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProviderService } from '../../../services/provider.service';

describe('ProviderComponent', () => {
  let component: ProviderComponent;
  let fixture: ComponentFixture<ProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderComponent,HttpClientTestingModule],
      providers: [ProviderService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
