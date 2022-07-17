import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoModeloComponent } from './produto-modelo.component';

describe('ProdutoModeloComponent', () => {
  let component: ProdutoModeloComponent;
  let fixture: ComponentFixture<ProdutoModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoModeloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
