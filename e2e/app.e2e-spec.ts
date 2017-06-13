import { ProyectoBCIPage } from './app.po';

describe('proyecto-bci App', function() {
  let page: ProyectoBCIPage;

  beforeEach(() => {
    page = new ProyectoBCIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
