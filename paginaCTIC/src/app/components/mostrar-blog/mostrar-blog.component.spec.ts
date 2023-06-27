import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarBlogComponent } from './mostrar-blog.component';

describe('MostrarBlogComponent', () => {
  let component: MostrarBlogComponent;
  let fixture: ComponentFixture<MostrarBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
