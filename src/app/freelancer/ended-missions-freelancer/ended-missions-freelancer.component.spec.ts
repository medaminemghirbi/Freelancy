import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndedMissionsFreelancerComponent } from './ended-missions-freelancer.component';

describe('EndedMissionsFreelancerComponent', () => {
  let component: EndedMissionsFreelancerComponent;
  let fixture: ComponentFixture<EndedMissionsFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndedMissionsFreelancerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndedMissionsFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
