import TemplateView from './TemplateView';
import './Authorization.scss';

export default class Authorization extends TemplateView {
  constructor() {
    super();
    this.setTitle('Authorization');
  }

  public async getHtml(): Promise<string> {
    return `<div class="authorization">This is Authorization page</div>`;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}