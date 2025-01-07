import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeometryComponent } from './geometry.component';

describe('GeometryComponent', () => {
  let component: GeometryComponent;
  let fixture: ComponentFixture<GeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeometryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
