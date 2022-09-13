import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilClientComponent } from './edit-profil-client.component';

describe('EditProfilClientComponent', () => {
  let component: EditProfilClientComponent;
  let fixture: ComponentFixture<EditProfilClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfilClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
