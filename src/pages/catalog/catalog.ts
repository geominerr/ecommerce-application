import TemplateView from '../template-view/template-view';
import './catalog.scss';
import { APIProductActions } from '../../api/product-actions/api-product-actions';

export default class Catalog extends TemplateView {
  private api: APIProductActions;

  constructor(api: APIProductActions) {
    super();
    this.api = api;
  }

  private documentTitle: string = 'Catalog';

  public async getHtml(): Promise<string> {
    return `<div class="catalog">This is Catalog page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
    this.getData();
  }

  private getData(): void {
    this.api
      .searchByCategoryName('placeholder', 10, 0)
      .then((data) => console.log('Catalog data: ', data));
  }
}
