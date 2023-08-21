import TemplateView from '../template-view/template-view';
import './turntables.scss';

export default class Turntables extends TemplateView {
  private documentTitle: string = 'Turntables';

  public async getHtml(): Promise<string> {
    return `<div class="turntables">This is Turntables page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}
