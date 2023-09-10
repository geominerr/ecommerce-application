import Sidebar from '../../../src/pages/detail-page/sidebar/sidebar';
import { Styles } from '../../../src/pages/detail-page/sidebar/enum';

describe('Sidebar product', () => {
  const testProductData = {
    id: 'id',
    title: 'title',
    price: '$ price',
    discountPrice: '$ discount price',
    description: 'description',
    images: ['1', '2', '3'],
    attributes: [
      { name: '1', value: 'null' },
      { name: '2', value: 'null' },
      { name: '3', value: 'null' },
    ],
  };

  const sidebar: Sidebar = new Sidebar(testProductData);
  const SidebarContainer = sidebar.getElement();

  document.body.append(SidebarContainer);

  it('should create an instance of Sidebar', () => {
    expect(sidebar).toBeInstanceOf(Sidebar);
  });

  it('should contain all elements of defined css classes', () => {
    const styles: string[] = Object.values(Styles);

    styles.forEach((style): void => {
      const element = document.body.querySelector(`.${style}`);

      if (style === 'product__button--disabled' || style === 'product__button--visible') {
        expect(element).toBeNull();
      } else {
        expect(element).not.toBeNull();
      }
    });
  });
});
