import TemplateView from '../template-view/template-view';
import './soundbars.scss';
import { APIProductActions } from '../../api/product-actions/api-product-actions';

export default class Soundbars extends TemplateView {
  private api: APIProductActions;

  constructor(api: APIProductActions) {
    super();
    this.api = api;
  }

  private documentTitle: string = 'Soundbars';

  public async getHtml(): Promise<string> {
    return `<div class="soundbars">This is Soundbar page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
    this.getData();
  }

  private getData(): void {
    this.api
      .searchByCategoryName('Soundbars', 10, 0)
      .then((data) => console.log('Soundbars data: ', data));
  }
}
