import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicoProfileComponent } from './musico-profile.component';

describe('MusicoProfileComponent', () => {
  let component: MusicoProfileComponent;
  let fixture: ComponentFixture<MusicoProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicoProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
