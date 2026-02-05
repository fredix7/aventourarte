import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSubmenuComponent } from './header-submenu.component';

describe('HeaderSubmenuComponent', () => {
  let component: HeaderSubmenuComponent;
  let fixture: ComponentFixture<HeaderSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSubmenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
