import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroListaComponent } from './financeiro-lista.component';

describe('FinanceiroListaComponent', () => {
  let component: FinanceiroListaComponent;
  let fixture: ComponentFixture<FinanceiroListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceiroListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceiroListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
