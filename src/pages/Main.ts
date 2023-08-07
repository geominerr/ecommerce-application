import TemplateView from './TemplateView';

export default class Main extends TemplateView {
  constructor() {
    super();
    this.setTitle('Main');
  }

  public async getHtml(): Promise<string> {
    return `<h1>This is main page</h1>`;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
