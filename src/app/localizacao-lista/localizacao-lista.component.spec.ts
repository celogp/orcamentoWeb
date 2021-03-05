import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacaoListaComponent } from './localizacao-lista.component';

describe('LocalizacaoListaComponent', () => {
  let component: LocalizacaoListaComponent;
  let fixture: ComponentFixture<LocalizacaoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalizacaoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizacaoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
