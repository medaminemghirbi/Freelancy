import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndedMissionsClientComponent } from './ended-missions-client.component';

describe('EndedMissionsClientComponent', () => {
  let component: EndedMissionsClientComponent;
  let fixture: ComponentFixture<EndedMissionsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndedMissionsClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndedMissionsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
