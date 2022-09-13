import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratecontratfreelancerComponent } from './generatecontratfreelancer.component';

describe('GeneratecontratfreelancerComponent', () => {
  let component: GeneratecontratfreelancerComponent;
  let fixture: ComponentFixture<GeneratecontratfreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratecontratfreelancerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratecontratfreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
