import { ProveedoresAppPage } from './app.po';

describe('proveedores-app App', function() {
  let page: ProveedoresAppPage;

  beforeEach(() => {
    page = new ProveedoresAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
