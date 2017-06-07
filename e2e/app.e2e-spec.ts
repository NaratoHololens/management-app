import { ManagmentAppPage } from './app.po';

describe('managment-app App', function() {
  let page: ManagmentAppPage;

  beforeEach(() => {
    page = new ManagmentAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
