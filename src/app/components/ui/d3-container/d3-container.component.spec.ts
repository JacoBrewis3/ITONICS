import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3ContainerComponent } from './d3-container.component';

describe('D3ContainerComponent', () => {
  let component: D3ContainerComponent;
  let fixture: ComponentFixture<D3ContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D3ContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
