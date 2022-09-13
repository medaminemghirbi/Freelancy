import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMissionsComponent } from './client-missions.component';

describe('ClientMissionsComponent', () => {
  let component: ClientMissionsComponent;
  let fixture: ComponentFixture<ClientMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
