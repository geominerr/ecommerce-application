export default class TemplateView {
  public setTitle(): void {}

  public async getHtml(): Promise<string | HTMLElement> {
    return '';
  }
}
