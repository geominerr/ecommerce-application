import DetailPage from '../../../src/pages/detail-page/detail-page';

describe('DetailPage', () => {
  const detailPage: DetailPage = new DetailPage();

  it('should create an instance of DetailPage', () => {
    expect(detailPage).toBeInstanceOf(DetailPage);
  });
});
