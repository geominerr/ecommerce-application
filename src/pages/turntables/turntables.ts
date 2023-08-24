import TemplateView from '../template-view/template-view';
import './turntables.scss';
import { APIProductActions } from '../../api/product-actions/api-product-actions';

export default class Turntables extends TemplateView {
  private api: APIProductActions;

  constructor(api: APIProductActions) {
    super();
    this.api = api;
  }

  private documentTitle: string = 'Turntables';

  public async getHtml(): Promise<string> {
    return `<div class="turntables">This is Turntables page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
    this.getData();
  }

  private getData(): void {
    this.api
      .searchByCategoryName('Turntables', 10, 0)
      .then((data) => console.log('Turntables data: ', data));
  }
}
