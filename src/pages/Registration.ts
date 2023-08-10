import TemplateView from './TemplateView';
import './Registration.scss';

export default class Registration extends TemplateView {
  constructor() {
    super();
    this.setTitle('Registration');
  }

  public async getHtml(): Promise<string> {
    return `<div class="registration">This is Registration page</div>`;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
