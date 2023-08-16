import TemplateView from '../template-view/template-view';
import './soundbars.scss';

export default class Soundbars extends TemplateView {
  private documentTitle: string = 'Soundbars';

  public async getHtml(): Promise<string> {
    return `<div class="soundbars">This is Soundbar page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}
