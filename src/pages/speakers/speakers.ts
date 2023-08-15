import TemplateView from '../template-view/template-view';
import './speakers.scss';

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
