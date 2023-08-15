import TemplateView from '../template-view/template-view';
import './not-found.scss';

export default class NotFound extends TemplateView {
  constructor() {
    super();
    this.setTitle('Not Found');
  }

  public async getHtml(): Promise<string> {
    return `
    <div class="error">
        <p>404 - page not found</p>
        <h2>Oh no…</h2>
        <p>It looks like something has gone wrong, you may have mistyped the address or the page has been removed.

        Try again or return to our homepage, where you can find all the latest news.</p>
        <button><a href="/">GO HOME</a></button>
    </div>
    `;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
