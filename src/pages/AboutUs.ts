import TemplateView from './TemplateView';

export default class About extends TemplateView {
  constructor() {
    super();
    this.setTitle('About Us');
  }

  public async getHtml(): Promise<string> {
    return `<h1>This is about us page</h1>`;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
