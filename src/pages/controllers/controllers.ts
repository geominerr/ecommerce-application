import TemplateView from '../template-view/template-view';
import './controllers.scss';

export default class Controllers extends TemplateView {
  private documentTitle: string = 'Controllers';

  public async getHtml(): Promise<string> {
    return `<div class="controllers">This is Controllers page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}
