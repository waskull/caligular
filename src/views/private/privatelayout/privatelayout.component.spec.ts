import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatelayoutComponent } from './privatelayout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('PrivatelayoutComponent', () => {
  let component: PrivatelayoutComponent;
  let fixture: ComponentFixture<PrivatelayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivatelayoutComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivatelayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
