import TemplateView from '../template-view/template-view';
import './soundbars.scss';

export default class Soundbars extends TemplateView {
  constructor() {
    super();
    this.setTitle('Soundbars');
  }

  public async getHtml(): Promise<string> {
    return `<div class="soundbars">This is Soundbar page</div>`;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
