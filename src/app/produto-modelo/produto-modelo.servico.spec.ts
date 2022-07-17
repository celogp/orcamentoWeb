import { TestBed } from '@angular/core/testing';

import { produtoModeloServico } from './produto-modelo.servico';

describe('ProdutoModeloService', () => {
  let service: produtoModeloServico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(produtoModeloServico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
