import TemplateView from './TemplateView';

export default class Auth extends TemplateView {
  constructor() {
    super();
    this.setTitle('Auth');
  }

  public async getHtml(): Promise<string> {
    return `<h1>This is auth page</h1>`;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
