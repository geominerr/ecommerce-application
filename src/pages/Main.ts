/* eslint-disable max-lines-per-function */
import TemplateView from './TemplateView';
import './Main.scss';

export default class Main extends TemplateView {
  constructor() {
    super();
    this.setTitle('Main');
  }

  public async getHtml(): Promise<string> {
    return `
    <div class="main-banner" style="background-image: url(../assets/img/banner.png)">
        <p>Your best <br>
        summer sound!</p>
        <button class="learn-more"><a href="">Learn more</a></button>
    </div>
    <div class="main-categories">
        <div class="main-headphones">
            <div class="main-headphones title">HEADPHONES</div>
            <a href="/headphones"><img src="../assets/img/main-headphones.png" alt="none"></a>
        </div>
        <div class="main-speakers">
            <div class="main-speakers title">SPEAKERS</div>
            <a href="/speakers"><img src="../assets/img/main-speakers.png" alt="none"></a>
        </div>
        <div class="main-turntables">
            <div class="main-turntables title">TURNTABLES</div>
            <a href="/turntables"><img src="../assets/img/main-turntables.png" alt="none"></a>
        </div>
        <div class="main-amplifiers">
            <div class="main-amplifiers title">AMPLIFIERS</div>
            <a href="/amplifiers"><img src="../assets/img/main-amplifiers.png" alt="none"></a>
        </div>
        <div class="main-soundbars">
            <div class="main-soundbars title">SOUNDBARS</div>
            <a href="/soundbars"><img src="../assets/img/main-soundbars.png" alt="none"></a>
        </div>
        <div class="main-controllers">
            <div class="main-controllers title">DJ Controllers</div>
            <a href="/controllers"><img src="../assets/img/main-controllers.png" alt="none"></a>
        </div>
    </div>
    <div class="main-follow">
        <div class="main-follow women" style="background-image: url(../assets/img/banner2.png)">
            <p>Follow your soul. And we’ll help you with that.</p>
        </div>
    </div>
    `;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
