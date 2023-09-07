import TemplateView from '../template-view/template-view';
import './cart.scss';

import { APICartActions } from '../../api/cart-actions/cart-actions';

export default class Cart extends TemplateView {
  private documentTitle: string = 'Cart';

  private APICartActions: APICartActions;

  constructor() {
    super();
    this.APICartActions = new APICartActions();
    this.APICartActions.getAnon();
  }

  public async getHtml(): Promise<string> {
    return `<div class="cart">This is Cart page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}
