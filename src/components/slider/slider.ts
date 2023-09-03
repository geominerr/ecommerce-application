import BaseComponent from '../base/base-component/base-component';
import { TagNames, Styles } from './enum';
import './slider.scss';

class Slider extends BaseComponent {
  private modalWrapper: HTMLDivElement;

  private btnClose: HTMLElement;

  private sliderWrapper: HTMLDivElement;

  private slider: HTMLDivElement;

  constructor(imagesUrl: string[]) {
    super();
    this.modalWrapper = this.createElement(TagNames.DIV, Styles.MODAL_WPAPPER);
    this.btnClose = this.createElement(TagNames.DIV, Styles.MODAL_BTN);
    this.sliderWrapper = this.createElement(TagNames.DIV, Styles.SLIDER_WRAPPER);
    this.slider = this.createElement(TagNames.DIV, Styles.SWIPER);

    this.createComponent(imagesUrl);
    this.addClickHandler();
  }

  public getElement(): HTMLElement {
    return this.modalWrapper;
  }

  private createComponent(imagesUrl: string[]): void {
    const { modalWrapper, sliderWrapper, slider, btnClose } = this;
    const swiperWrapper = this.createSwiperWrapper(imagesUrl);
    const pagination = this.createElement(TagNames.DIV, Styles.SWIPER_PAGINATION);
    const buttonPrev = this.createElement(TagNames.DIV, Styles.SWIPER_BTN_PREV);
    const buttonNext = this.createElement(TagNames.DIV, Styles.SWIPER_BTN_NEXT);
    slider.classList.add(Styles.SWIPER_CUSTOM);

    [swiperWrapper, pagination, buttonPrev, buttonNext].forEach((el) => slider.append(el));
    [btnClose, slider].forEach((el) => sliderWrapper.append(el));
    modalWrapper.append(sliderWrapper);
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

  private addClickHandler(): void {
    const { modalWrapper } = this;

    modalWrapper.addEventListener('click', (e) => {
      const { target } = e;

      if (target instanceof HTMLImageElement && target.classList.contains(Styles.SLIDE_IMG)) {
        modalWrapper.classList.add(Styles.MODAL_ACTIVE);
        document.body.classList.add(Styles.LOCK);
      }

      if (target instanceof HTMLElement) {
        if (
          target.classList.contains(Styles.MODAL_BTN) ||
          target.classList.contains(Styles.MODAL_WPAPPER)
        ) {
          modalWrapper.classList.remove(Styles.MODAL_ACTIVE);
          document.body.classList.remove(Styles.LOCK);
        }
      }
    });
  }
}

export default Slider;
