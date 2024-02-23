import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserformComponent } from './userform.component';
import { UserService } from '../../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserformComponent', () => {
  let component: UserformComponent;
  let fixture: ComponentFixture<UserformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserformComponent, HttpClientTestingModule],
      providers:[UserService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
