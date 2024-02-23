import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderformComponent } from './providerform.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProviderService } from '../../services/provider.service';

describe('ProviderformComponent', () => {
  let component: ProviderformComponent;
  let fixture: ComponentFixture<ProviderformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderformComponent, HttpClientTestingModule],
      providers: [ProviderService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
