import TemplateView from '../template-view/template-view';
import './cart.scss';

import { APIAcceesToken } from '../../api/api-access-token'; // Удалить
import { IAnonymousResponse } from '../../api/api-interfaces';

export default class Cart extends TemplateView {
  private api: APIAcceesToken; // Удалить

  constructor() {
    super();
    this.api = new APIAcceesToken(); // Удалить
    this.getAnon(); // Удалить
  }

  // Метод ниже исключительно для теста api. Его необходимо удалить по окончанию настройки.
  private async getAnon(): Promise<void> {
    const anon: IAnonymousResponse = await this.api.getAnonymousToken();
    console.log('anon: ', anon);

    const refresh = await this.api.refreshToken(anon.refresh_token);
    console.log('refreshed: ', refresh);
  }

  private documentTitle: string = 'Cart';

  public async getHtml(): Promise<string> {
    return `<div class="cart">This is Cart page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}
