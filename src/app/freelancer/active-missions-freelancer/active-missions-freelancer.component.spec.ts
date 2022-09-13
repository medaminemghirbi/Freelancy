import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMissionsFreelancerComponent } from './active-missions-freelancer.component';

describe('ActiveMissionsFreelancerComponent', () => {
  let component: ActiveMissionsFreelancerComponent;
  let fixture: ComponentFixture<ActiveMissionsFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveMissionsFreelancerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveMissionsFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
