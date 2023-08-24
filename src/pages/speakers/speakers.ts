import TemplateView from '../template-view/template-view';
import './speakers.scss';
import { APIProductActions } from '../../api/product-actions/api-product-actions';

export default class Speakers extends TemplateView {
  private api: APIProductActions;

  constructor(api: APIProductActions) {
    super();
    this.api = api;
  }

  private documentTitle: string = 'Speakers';

  public async getHtml(): Promise<string> {
    return `<div class="speakers">This is Speakers page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
    this.getData();
  }

  private getData(): void {
    this.api
      .searchByCategoryName('Sound-systems', 10, 0)
      .then((data) => console.log('Sound-systems data: ', data));
  }
}
