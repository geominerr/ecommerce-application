import TemplateView from '../template-view/template-view';
import './amplifiers.scss';
import { APIProductActions } from '../../api/product-actions/api-product-actions';

export default class Amplifiers extends TemplateView {
  private api: APIProductActions;

  constructor(api: APIProductActions) {
    super();
    this.api = api;
  }

  private documentTitle: string = 'Amplifiers';

  public async getHtml(): Promise<string> {
    return `<div class="amplifiers">This is Amplifiers page</div>`;
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
