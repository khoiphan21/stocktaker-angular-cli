import { StocktakerAngularCliPage } from './app.po';

describe('stocktaker-angular-cli App', function() {
  let page: StocktakerAngularCliPage;

  beforeEach(() => {
    page = new StocktakerAngularCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
