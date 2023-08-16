import TemplateView from '../template-view/template-view';
import './headphones.scss';

export default class Headphones extends TemplateView {
  private documentTitle: string = 'Headphones';

  public async getHtml(): Promise<string> {
    return `<div class="headphones">This is headphones page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}
