import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangularBeamImageComponent } from './rectangular-beam-image.component';

describe('RectangularBeamImageComponent', () => {
  let component: RectangularBeamImageComponent;
  let fixture: ComponentFixture<RectangularBeamImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RectangularBeamImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RectangularBeamImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
