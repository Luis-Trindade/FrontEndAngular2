import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulRescComponent } from './simulresc.component';
import { PageHeaderModule } from './../../shared';

describe('SimulRescComponent', () => {
  let component: SimulRescComponent;
  let fixture: ComponentFixture<SimulRescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ PageHeaderModule ],
      declarations: [ SimulRescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulRescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
