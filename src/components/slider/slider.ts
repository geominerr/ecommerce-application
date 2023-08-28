import BaseComponent from '../base/base-component/base-component';
import { TagNames, Styles } from './enum';
import './slider.scss';

class Slider extends BaseComponent {
  private slider: HTMLDivElement;

  constructor(imagesUrl: string[]) {
    super();
    this.slider = this.createElement(TagNames.DIV, Styles.SWIPER);

    this.createComponent(imagesUrl);
  }

  public getElement(): HTMLElement {
    return this.slider;
  }

  private createComponent(imagesUrl: string[]): void {
    const { slider } = this;
    const swiperWrapper = this.createSwiperWrapper(imagesUrl);
    const pagination = this.createElement(TagNames.DIV, Styles.SWIPER_PAGINATION);
    slider.classList.add(Styles.SWIPER_CUSTOM);

    const buttonPrev = this.createElement(TagNames.DIV, Styles.SWIPER_BTN_PREV);
    const buttonNext = this.createElement(TagNames.DIV, Styles.SWIPER_BTN_NEXT);

    [swiperWrapper, pagination, buttonPrev, buttonNext].forEach((el) => slider.append(el));
  }

  private createSwiperWrapper(imagesUrl: string[]): HTMLElement {
    const swiperWrapper: HTMLElement = this.createElement(TagNames.DIV, Styles.SWIPER_WRAPPER);

    imagesUrl.forEach((url) => swiperWrapper.append(this.createSlide(url)));

    return swiperWrapper;
  }

  private createSlide(imgUrl: string): HTMLElement {
    const swiperSlide: HTMLElement = this.createElement(TagNames.DIV, Styles.SWIPER_SLIDE);
    const image: HTMLImageElement = this.createElement(TagNames.IMG, Styles.SLIDE_IMG);
    const imageWrap: HTMLDivElement = this.createElement(TagNames.DIV, Styles.IMG_WRAPPER);

    image.src = imgUrl;
    imageWrap.append(image);
    swiperSlide.append(imageWrap);

    return swiperSlide;
  }
}

export default Slider;
