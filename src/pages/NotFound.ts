import TemplateView from './TemplateView';

export default class NotFound extends TemplateView {
  constructor() {
    super();
    this.setTitle('Not Found');
  }

  public async getHtml(): Promise<string> {
    return `<h1>This is Not Found page</h1>`;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
