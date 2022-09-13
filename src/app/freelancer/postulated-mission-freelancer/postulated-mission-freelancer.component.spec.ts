import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulatedMissionFreelancerComponent } from './postulated-mission-freelancer.component';

describe('PostulatedMissionFreelancerComponent', () => {
  let component: PostulatedMissionFreelancerComponent;
  let fixture: ComponentFixture<PostulatedMissionFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulatedMissionFreelancerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulatedMissionFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
