import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoModeloListaComponent } from './produto-modelo-lista.component';

describe('ProdutoModeloListaComponent', () => {
  let component: ProdutoModeloListaComponent;
  let fixture: ComponentFixture<ProdutoModeloListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoModeloListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoModeloListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
