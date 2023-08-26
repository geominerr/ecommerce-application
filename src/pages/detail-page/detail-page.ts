import TemplateView from '../template-view/template-view';
import Sidebar from './sidebar/sidebar';
import converteResponseData from '../../utils/response-converter/response-converter';
import { APIProductActions } from '../../api/product-actions/api-product-actions';
import { IProductData } from './detail-page-interfaces';
import { TagNames, Styles } from './enum';
import './detail-page.scss';

const testObject: IProductData = {
  title: 'Test title Pioneer',
  id: 'dsfdslfkjsdflkjsdf87873298423',
  description: `Основные особенности NOVATION Launchpad Mini MK3: 64 пэда RGB — идеально отражают сессию на Ableton Live, облегчая просмотр клипов. Интеграция с Ableton Live — быстрый запуск клипов и сцен одним нажатием кнопки. Stop, Solo, Mute облегчает и ускоряет управление выступлением — мышка не нужна. 3 пользовательских режима Custom — благодаря Novation Components есть возможность настроить мапинг и  считанные минуты.`,
  price: '$ 123.23',
  discountPrice: '$ 99.99',
  images: [
    'https://814486673bc6ecc6fe13-b83f982f78fa32fc8630af54f313f31e.ssl.cf3.rackcdn.com/ezgif.com-webp-to-jp-L36X-Piq.jpg',
    'https://814486673bc6ecc6fe13-b83f982f78fa32fc8630af54f313f31e.ssl.cf3.rackcdn.com/ezgif.com-webp-to-jp-lSKu54x2.jpg',
    'https://814486673bc6ecc6fe13-b83f982f78fa32fc8630af54f313f31e.ssl.cf3.rackcdn.com/ezgif.com-webp-to-jp-rmeCBdSu.jpg',
    'https://814486673bc6ecc6fe13-b83f982f78fa32fc8630af54f313f31e.ssl.cf3.rackcdn.com/ezgif.com-webp-to-jp-8cZMoCOA.jpg',
  ],
  attributes: [
    {
      name: 'nameTestsdfdsf',
      value: 'value Tsdf sdfsdfd',
    },
    { name: 'nameTes df ', value: 'valuefds f t' },
    { name: 'nameTest', value: 'vas df dslueTest' },
    { name: 'nameTsdfdsf  sf sdfest', value: 'valueTssf sest' },
    { name: 'namedfdfdfTest', value: 'valueTs df sfest' },
    { name: 'nameT s dfsdf  est', value: 'values df sTest' },
  ],
};

class DetailPage extends TemplateView {
  private container: HTMLDivElement;

  private navigation: HTMLElement;

  private productWrapper: HTMLDivElement;

  private slider: HTMLDivElement;

  private sidebar: HTMLDivElement;

  private api: APIProductActions;

  constructor() {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.navigation = this.createElement(TagNames.NAV, Styles.NAV);
    this.productWrapper = this.createElement(TagNames.DIV, Styles.PRODUCT_WRAPPER);
    this.slider = this.createElement(TagNames.DIV, Styles.SLIDER);
    this.sidebar = this.createElement(TagNames.DIV, Styles.SIDEBAR);
    this.api = new APIProductActions();

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private async createComponent(): Promise<void> {
    const { container, navigation, productWrapper, slider, sidebar } = this;

    const responseData = await this.api
      .getProductByID('214b1b4f-8d0d-4d88-b045-03d05011e408')
      .catch();
    const productData = converteResponseData(responseData);
    console.log(productData);

    const sidebarElement = new Sidebar(testObject).getElement();
    //

    navigation.innerText = 'Navigation - breadcrumb';
    slider.innerText = 'SLIDER';
    sidebar.append(sidebarElement);
    [slider, sidebar].forEach((el: HTMLElement): void => productWrapper.append(el));
    [navigation, productWrapper].forEach((el: HTMLElement): void => container.append(el));
  }

  private createElement<T extends HTMLElement>(tagName: string, style: string): T {
    const element: T = document.createElement(tagName) as T;
    element.classList.add(style);

    return element;
  }
}

export default DetailPage;
