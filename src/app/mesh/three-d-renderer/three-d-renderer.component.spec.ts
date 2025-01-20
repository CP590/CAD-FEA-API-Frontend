import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDRendererComponent } from './three-d-renderer.component';

describe('ThreeDRendererComponent', () => {
  let component: ThreeDRendererComponent;
  let fixture: ComponentFixture<ThreeDRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeDRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
