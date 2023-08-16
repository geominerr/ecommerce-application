export default class TemplateView {
  public setTitle(title: string): void {
    document.title = title;
  }

  public async getHtml(): Promise<string | HTMLElement> {
    return '';
  }
}
