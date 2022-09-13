import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoMissionsComponent } from './to-do-missions.component';

describe('ToDoMissionsComponent', () => {
  let component: ToDoMissionsComponent;
  let fixture: ComponentFixture<ToDoMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoMissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
