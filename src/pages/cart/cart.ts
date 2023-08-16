import TemplateView from '../template-view/template-view';
import './cart.scss';

export default class Cart extends TemplateView {
  private documentTitle: string = 'Cart';

  public async getHtml(): Promise<string> {
    return `<div class="cart">This is Cart page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}
