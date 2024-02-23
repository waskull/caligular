import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EdituserComponent } from './edituser.component';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user.service';

describe('EdituserComponent', () => {
  let component: EdituserComponent;
  let fixture: ComponentFixture<EdituserComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdituserComponent,HttpClientTestingModule],
      providers:[UserService,AuthService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdituserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
