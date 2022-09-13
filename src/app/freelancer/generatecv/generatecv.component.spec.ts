import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratecvComponent } from './generatecv.component';

describe('GeneratecvComponent', () => {
  let component: GeneratecvComponent;
  let fixture: ComponentFixture<GeneratecvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratecvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratecvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
