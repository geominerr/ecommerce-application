import Slider from '../../../src/components/slider/slider';
import { Styles } from '../../../src/components/slider/enum';

describe('Slider', () => {
  const urlImages: string[] = ['testUrlImage1', 'testUrlImage2', 'testUrlImage3'];
  const slider: Slider = new Slider(urlImages);
  const sliderContainer = slider.getElement();

  document.body.append(sliderContainer);

  it('should create an instance of Slider', () => {
    expect(slider).toBeInstanceOf(Slider);
  });

  it('should contain all elements of defined css classes', () => {
    const styles: string[] = Object.values(Styles);

    styles.forEach((style): void => {
      const element = document.body.querySelector(`.${style}`);

      if (style === 'modal-wrapper--active' || style === 'lock') {
        expect(element).toBeNull();
      } else {
        expect(element).not.toBeNull();
      }
    });
  });
});
