import TemplateView from '../template-view/template-view';
import './about-us.scss';

export default class AboutUs extends TemplateView {
  private documentTitle: string = 'About us';

  public async getHtml(): Promise<string> {
    return `<div class="about-us">This is About Us page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}
