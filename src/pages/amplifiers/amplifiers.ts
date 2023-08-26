import TemplateView from '../template-view/template-view';
import './amplifiers.scss';
import { APIProductActions } from '../../api/product-actions/api-product-actions';
import DetailPage from '../detail-page/detail-page';

export default class Amplifiers extends TemplateView {
  private api: APIProductActions;

  private detailPage: DetailPage;

  constructor(api: APIProductActions) {
    super();
    this.api = api;
    this.detailPage = new DetailPage();
  }

  private documentTitle: string = 'Amplifiers';

  public async getHtml(): Promise<HTMLElement> {
    return this.detailPage.getElement();
  }

  public setTitle(): void {
    document.title = this.documentTitle;
    this.getData();
  }

  private getData(): void {
    this.api
      .searchByCategoryName('Amplifiers', 10, 0)
      .then((data) => console.log('Amplifiers data: ', data));
  }
}
