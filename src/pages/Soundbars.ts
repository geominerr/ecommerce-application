import TemplateView from './TemplateView';
import './Soundbars.scss';

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
