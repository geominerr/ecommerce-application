import TemplateView from '../template-view/template-view';
import './controllers.scss';
import { APIProductActions } from '../../api/product-actions/api-product-actions';

export default class Controllers extends TemplateView {
  private api: APIProductActions;

  constructor(api: APIProductActions) {
    super();
    this.api = api;
  }

  private documentTitle: string = 'Controllers';

  public async getHtml(): Promise<string> {
    return `<div class="controllers">This is Controllers page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
    this.getData();
  }

  private getData(): void {
    this.api
      .searchByCategoryName('Controllers', 10, 0)
      .then((data) => console.log('Controllers data: ', data));
  }
}
