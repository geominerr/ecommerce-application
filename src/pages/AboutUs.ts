import TemplateView from './TemplateView';
import './AboutUs.scss';

export default class AboutUs extends TemplateView {
  constructor() {
    super();
    this.setTitle('About Us');
  }

  public async getHtml(): Promise<string> {
    return `<div class="about-us">This is About Us page</div>`;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
