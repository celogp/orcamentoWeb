import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoModeloComponComponent } from './produto-modelo-compon.component';

describe('ProdutoModeloComponComponent', () => {
  let component: ProdutoModeloComponComponent;
  let fixture: ComponentFixture<ProdutoModeloComponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoModeloComponComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoModeloComponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
