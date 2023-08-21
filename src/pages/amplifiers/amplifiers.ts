import TemplateView from '../template-view/template-view';
import './amplifiers.scss';

export default class Amplifiers extends TemplateView {
  private documentTitle: string = 'Amplifiers';

  public async getHtml(): Promise<string> {
    return `<div class="amplifiers">This is Amplifiers page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}
