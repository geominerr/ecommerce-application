import TemplateView from './TemplateView';
import './Speakers.scss';

export default class Speakers extends TemplateView {
  constructor() {
    super();
    this.setTitle('Speakers');
  }

  public async getHtml(): Promise<string> {
    return `<div class="speakers">This is Speakers page</div>`;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
