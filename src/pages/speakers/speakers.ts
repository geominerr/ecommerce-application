import TemplateView from '../template-view/template-view';
import './speakers.scss';

export default class Speakers extends TemplateView {
  private documentTitle: string = 'Speakers';

  public async getHtml(): Promise<string> {
    return `<div class="speakers">This is Speakers page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}
