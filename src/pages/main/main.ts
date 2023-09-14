/* eslint-disable max-lines-per-function */
import TemplateView from '../template-view/template-view';
import './main-page.scss';

export default class Main extends TemplateView {
  private documentTitle: string = 'Main';

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
            <a href="/catalog/headphones""><img src="../assets/svg/main-headphones.svg" alt="none"></a>
        </div>
        <div class="main-speakers">
            <div class="main-speakers title">SPEAKERS</div>
            <a href="/catalog/sound-systems""><img src="../assets/svg/main-speakers.svg" alt="none"></a>
        </div>
        <div class="main-turntables">
            <div class="main-turntables title">TURNTABLES</div>
            <a href="/catalog/turntables"><img src="../assets/svg/main-turntables.svg" alt="none"></a>
        </div>
        <div class="main-amplifiers">
            <div class="main-amplifiers title">AMPLIFIERS</div>
            <a href="/catalog/amplifiers""><img src="../assets/svg/main-amplifiers.svg" alt="none"></a>
        </div>
        <div class="main-controllers">
            <div class="main-controllers title">DJ Controllers</div>
            <a href="/catalog/controllers""><img src="../assets/svg/main-controllers.svg" alt="none"></a>
        </div>
    </div>
    <div class="main-follow">
        <div class="main-follow women" style="background-image: url(../assets/img/banner2.png)">
            <p>Follow your<br> soul.<br> And we’ll help you with that.</p>
        </div>
    </div>
    <div class="main-advantages">
        <div class="main-advantages-title">
            Making an order with us,<br>
            you get:
        </div>
        <div class="main-advantages list">
            <div class="main-advantages prices">
                <img src="../assets/svg/advantages/pig.svg" alt="none">
                <div class="main-advantages description">
                    low<br>
                    prices
                </div>
            </div>
            <div class="main-advantages advice">
                <img src="../assets/svg/advantages/support.svg" alt="none">
                <div class="main-advantages description">
                    friendly<br>
                    advice
                </div>
            </div>
            <div class="main-advantages delivery">
                <img src="../assets/svg/advantages/car.svg" alt="none">
                <div class="main-advantages description">
                    fast<br>
                    delivery
                </div>
            </div>
            <div class="main-advantages package">
                <img src="../assets/svg/advantages/package.svg" alt="none">
                <div class="main-advantages description">
                    reliable<br>
                    packaging<br>
                </div>
            </div>
            <div class="main-advantages ambient">
                <img src="../assets/svg/advantages/ambient.svg" alt="none">
                <div class="main-advantages description">
                    minimum<br>
                    percentage<br>
                    of defects
                </div>
            </div>
            <div class="main-advantages loyalty">
                <img src="../assets/svg/advantages/loyalty.svg" alt="none">
                <div class="main-advantages description">
                    discount<br>
                    of a regular<br>
                    customer
                </div>
            </div>
        </div>
    </div>
    <div class="main-holiday" style="background-image: url(../assets/img/holiday.png)">
        <p>Treat yourself<br>
        to a holiday!</p>
    </div>
    `;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}
