import TemplateView from '../template-view/template-view';
import './cart.scss';

import { APIAcceesToken } from '../../api/api-access-token'; // Удалить

export default class Cart extends TemplateView {
  private api: APIAcceesToken; // Удалить

  constructor() {
    super();
    this.api = new APIAcceesToken(); // Удалить
    this.getAnon(); // Удалить
  }

  // Метод ниже исключительно для теста api. Его необходимо удалить по окончанию настройки.
  private async getAnon(): Promise<void> {
    const anon = await this.api.getAnonymousToken();
    console.log('anon: ', anon);
  }

  private documentTitle: string = 'Cart';

  public async getHtml(): Promise<string> {
    return `<div class="cart">This is Cart page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}
