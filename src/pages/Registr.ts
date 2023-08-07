import TemplateView from './TemplateView';

export default class Registr extends TemplateView {
  constructor() {
    super();
    this.setTitle('Registr');
  }

  public async getHtml(): Promise<string> {
    return `<h1>This is registr page</h1>`;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
