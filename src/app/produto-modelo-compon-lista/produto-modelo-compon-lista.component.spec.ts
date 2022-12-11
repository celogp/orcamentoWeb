import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoModeloComponListaComponent } from './produto-modelo-compon-lista.component';

describe('ProdutoModeloComponListaComponent', () => {
  let component: ProdutoModeloComponListaComponent;
  let fixture: ComponentFixture<ProdutoModeloComponListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoModeloComponListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoModeloComponListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
