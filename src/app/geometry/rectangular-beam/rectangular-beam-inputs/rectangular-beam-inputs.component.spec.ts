import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangularBeamInputsComponent } from './rectangular-beam-inputs.component';

describe('RectangularBeamInputsComponent', () => {
  let component: RectangularBeamInputsComponent;
  let fixture: ComponentFixture<RectangularBeamInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RectangularBeamInputsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RectangularBeamInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
