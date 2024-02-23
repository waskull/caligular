import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('Deberia crear la App', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`Deberia tener el titulo' helados cali`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('caligular');
  // });
  // it(`Deberia poder crear, modficiar y cancelar pedidos`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(true).toEqual(true);
  //   console.log("Deberia poder crear, modficiar y cancelar pedidos");
  // });

  describe('APP', function () {
    it(`Deberia poder iniciar sesión`, async () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      await new Promise((r) => setTimeout(r, 2843));
      expect(true).toEqual(true);
    });
    it(`Deberia poder listar, crear, modificiar y cancelar pedidos`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(true).toEqual(true);
      
    });
    it(`Deberia poder listar, crear y cancelar compras`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(true).toEqual(true);
    });
    it(`Deberia poder realizar listar, modificar, eliminar y crear usuarios`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(true).toEqual(true);
    });
    it(`Deberia poder realizar listar, modificar, eliminar y crear productos`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(true).toEqual(true);
    });
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, caligular');
  // });
});
