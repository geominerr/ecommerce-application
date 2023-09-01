import TemplateView from '../template-view/template-view';
import './catalog.scss';
import { APIProductActions } from '../../api/product-actions/api-product-actions';
import { transform } from '../../utils/response-converter/response-converter';
import { TagNames, Styles, Events } from './enum';

import ProductCard from '../../components/product-card/product-card';

export default class Catalog extends TemplateView {
  private container: HTMLDivElement;

  private card_container: HTMLDivElement;

  private nav_sidebar: HTMLDivElement;

  private applySortBtn: HTMLButtonElement;

  private api: APIProductActions;

  private default_min_price: string;

  private default_max_price: string;

  constructor(api: APIProductActions) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CATALOG_CONTENT);
    this.card_container = this.createElement(TagNames.DIV, Styles.CARD_CONTAINER);
    this.nav_sidebar = this.createElement(TagNames.DIV, Styles.NAV_SIDEBAR);
    this.applySortBtn = this.createElement(TagNames.BUTTON, Styles.BUTTON);
    this.api = api;
    this.default_min_price = '0'; // $
    this.default_max_price = '1000000'; // $
    this.createSorting();
    this.load();
  }

  private documentTitle: string = 'Catalog';

  public async getHtml(): Promise<HTMLElement> {
    this.container.append(this.nav_sidebar);
    this.container.append(this.card_container);
    return this.container;
  }

  // Отсюда начинается загрузка
  private load(): void {
    if (!window.location.href.split('/')[4]) {
      // запускается, если просто catalog, без категории
      this.makeCard();
    } else {
      this.filterByCategory();
    }
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }

  private async makeCard(searchParam: string = ''): Promise<void> {
    const CARD_DATA = await this.api.getProjectData('product-projections', 20, 0, searchParam);
    console.log(CARD_DATA);

    // лучше проверить прилетела ли дата,чтобы приложение не крашнуть на undefined/null.forEach()
    if (CARD_DATA.limit) {
      // чистим контейнер а иначе там будут сотни карточек при каждом новом клике по catalog link
      this.card_container.innerHTML = '';

      CARD_DATA.results.forEach((res) => {
        console.log('transformed', transform(res));
        //  типа вот так new ProductCard(converteResponseData(rec)

        const card = new ProductCard(transform(res)).getElement();
        this.card_container.append(card);
      });
    }
  }

  private createElement<T extends HTMLElement>(tagName: string, style: string): T {
    const element: T = document.createElement(tagName) as T;
    element.classList.add(style);

    return element;
  }

  private createSorting(): void {
    this.nav_sidebar.append(this.applySortBtn);
    this.applySortBtn.innerText = 'Apply sort';
    this.addClickHandler(this.applySortBtn);
  }

  private filterByBrand(
    brand: string = '',
    country: string = '',
    min_price: string = this.default_min_price,
    max_price = this.default_max_price,
    additionalSortParam = ''
  ): void {
    if (!brand) {
      brand = 'exists';
    } else {
      brand = `"${brand}"`;
    }

    this.filterByRegistrationCountry(
      country,
      min_price,
      max_price,
      `filter=variants.attributes.brand:${brand}&${additionalSortParam}`
    );
  }

  // Сортирует по стране бренда. По умолчанию пустая строка.
  // Вернет только те товавры, у которых есть атрибут страны. - Ключ "exists".
  // Стоит позаботиться, чтобы у всех товаров было несколько общих атрибутов.
  // Принимает
  private filterByRegistrationCountry(
    country: string = '',
    min_price: string = this.default_min_price,
    max_price = this.default_max_price,
    additionalSortParam = ''
  ): void {
    if (!country) {
      country = 'exists';
    } else {
      country = `"${country}"`;
    }

    this.filterByMinPrice(
      min_price,
      max_price,
      `filter=variants.attributes.brand-registration-country:${country}&${additionalSortParam}`
    );
  }

  // Сортирует по минимальной цене. По умолчанию ноль.
  // Принимает минимальную цену, максимальную цену и дополнительный параметр поиска/фильтра/сортирвки.
  private filterByMinPrice(
    min_price: string = this.default_min_price,
    max_price: string = this.default_max_price,
    additionalSortParam: string = ''
  ): void {
    const price = String(+min_price * 100);

    this.filterByMaxPrice(
      max_price,
      `filter=variants.price.centAmount:range (${price} to *)&${additionalSortParam}`
    );
  }

  // Сортирует по максимальной цене. По умолчанию миллион долларов.
  // Принимает максимальную цену и дополнительный параметр поиска/фильтра/сортирвки.
  private filterByMaxPrice(
    max_price: string = this.default_max_price,
    additionalSortParam: string = ''
  ): void {
    const price = String(+max_price * 100);

    this.filterByCategory(
      `filter=variants.price.centAmount:range (* to ${price})&${additionalSortParam}`
    );
  }

  // Сортирует по категории, если она есть после "/". Принимает дополнительный параметр поиска/фильтра/сортирвки.
  private async filterByCategory(additionalSortParam: string = ''): Promise<void> {
    const currentURLCategory = window.location.href.split('/')[4]; // если undefined, то будет пустой каталог
    const categories = await this.api.getProjectData('categories', 20, 0);

    if (!currentURLCategory) {
      this.makeCard(`${additionalSortParam}`);
    } else {
      categories.results.forEach((data) => {
        if (data.externalId === currentURLCategory) {
          this.makeCard(`filter=categories.id:"${data.id}"&${additionalSortParam}`);
        }
      });
    }
  }

  private addClickHandler(applySortBtn: HTMLElement): void {
    applySortBtn.addEventListener(Events.CLICK, async () => {
      console.log('Sort pushed');

      // this.filterByMinPrice('1000', '2000', '');
      this.filterByBrand('Pioneer', '', '100', '9000', '');
    });
  }
}
