import TemplateView from '../template-view/template-view';
import './profile.scss';

export default class Profile extends TemplateView {
  private documentTitle: string = 'Profile';

  public async getHtml(): Promise<string> {
    return `<div class="profile">This is Profile page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}
