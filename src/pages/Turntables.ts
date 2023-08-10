import TemplateView from './TemplateView';
import './Turntables.scss';

export default class Turntables extends TemplateView {
  constructor() {
    super();
    this.setTitle('Turntables');
  }

  public async getHtml(): Promise<string> {
    return `<div class="turntables">This is Turntables page</div>`;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
