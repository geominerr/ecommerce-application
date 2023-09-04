import TemplateView from '../template-view/template-view';
import NavbarBreadcrumb from '../../components/navbar-breadcrumb/navbar-breadcrumb';
import Sidebar from './sidebar/sidebar';
import Slider from '../../components/slider/slider';
import converteResponseData from '../../utils/response-converter/response-converter';
import { NOT_FOUND } from './not-found';
import { APIProductActions } from '../../api/product-actions/api-product-actions';
import { TagNames, Styles } from './enum';
import './detail-page.scss';

// swiper
// eslint-disable-next-line import/no-extraneous-dependencies
import Swiper from 'swiper';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

class DetailPage extends TemplateView {
  private container: HTMLElement;

  private navigation: HTMLElement;

  private productWrapper: HTMLDivElement;

  private navbar: NavbarBreadcrumb;

  private slider: HTMLDivElement;

  private sidebar: HTMLDivElement;

  private api: APIProductActions;

  private swiper: Swiper | null = null;

  constructor() {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.navigation = this.createElement(TagNames.NAV, Styles.NAV);
    this.productWrapper = this.createElement(TagNames.DIV, Styles.PRODUCT_WRAPPER);
    this.slider = this.createElement(TagNames.DIV, Styles.SLIDER);
    this.sidebar = this.createElement(TagNames.DIV, Styles.SIDEBAR);
    this.navbar = new NavbarBreadcrumb();
    this.navigation.append(this.navbar.getElement());
    this.api = new APIProductActions();
  }

  public async getElement(id: string): Promise<HTMLElement> {
    let container = this.container;

    this.createComponent(id)
      .then((element) => (container = element))
      .catch(() => (container.innerHTML = NOT_FOUND)); // здесь отловим ошибки некорректных данных и не дай бог Swiper )пока в консоль, потом можно через popup сообщение ...

    return container;
  }

  private setTitleProduct(title: string): void {
    document.title = title;
  }

  private async createComponent(id: string): Promise<HTMLElement> {
    const { container, navigation, navbar, productWrapper, slider, sidebar } = this;

    navbar.clearContainer();
    container.innerHTML = '';
    slider.innerHTML = '';
    sidebar.innerHTML = '';

    let productData;

    try {
      const responseData = await this.api.getProductByID(id).catch();
      productData = converteResponseData(responseData);
    } catch {
      throw Error('Invalid Product Data');
    }

    const sidebarElement = new Sidebar(productData).getElement();
    const sliderSwiper = new Slider(productData.images).getElement();
    this.setTitleProduct(productData.title);

    navbar.updateNavbar(productData.key, productData.title);
    sidebar.append(sidebarElement);
    slider.append(sliderSwiper);
    setTimeout(() => this.initSwiper(), 10);

    [slider, sidebar].forEach((el: HTMLElement): void => productWrapper.append(el));
    [navigation, productWrapper].forEach((el: HTMLElement): void => container.append(el));

    return this.container;
  }

  private initSwiper(): void {
    /* проверяем создавали мы уже Swiper, если true 
    (крашем наш старый swiper, что бы не было конфликтов на новоотрисованом slider,
      на всякий случай вкинул try/catch пару раз была ошибка, когда инициализация происходила
      раньше, чем наш slider отрисовался в DOM, решил через иниwиализацию с setTimeout,
      похорошему необходимо использовать MutationObserver, и инициализировать swiper после изменения в DOM,
      но моя реализация observer почему-то не корректно работала... оставил setTimeout )*/
    if (this.swiper) {
      try {
        this.swiper.destroy();
      } catch {
        throw Error('Swiper problem');
      }
    }

    try {
      this.swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination],
        loop: true,

        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    } catch {
      throw Error('Swiper problem');
    }
  }

  private createElement<T extends HTMLElement>(tagName: string, style: string): T {
    const element: T = document.createElement(tagName) as T;
    element.classList.add(style);

    return element;
  }
}

export default DetailPage;
