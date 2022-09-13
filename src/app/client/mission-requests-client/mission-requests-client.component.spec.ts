import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionRequestsClientComponent } from './mission-requests-client.component';

describe('MissionRequestsClientComponent', () => {
  let component: MissionRequestsClientComponent;
  let fixture: ComponentFixture<MissionRequestsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionRequestsClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionRequestsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
