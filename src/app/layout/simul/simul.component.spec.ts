import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulComponent } from './simul.component';
import { PageHeaderModule } from './../../shared';

describe('SimulComponent', () => {
  let component: SimulComponent;
  let fixture: ComponentFixture<SimulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ PageHeaderModule ],
      declarations: [ SimulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
