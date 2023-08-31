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

  constructor(api: APIProductActions) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CATALOG_CONTENT);
    this.card_container = this.createElement(TagNames.DIV, Styles.CARD_CONTAINER);
    this.nav_sidebar = this.createElement(TagNames.DIV, Styles.NAV_SIDEBAR);
    this.applySortBtn = this.createElement(TagNames.BUTTON, Styles.BUTTON);
    this.api = api;
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
      this.sortByMaxPrice('100000', '');
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

  private sortByMaxPrice(price: string = '', additionalSortParam: string = ''): void {
    price = String(+price * 100);
    this.sortByCategory(
      `filter=variants.price.centAmount:range (* to ${price})&${additionalSortParam}`
    );
  }

  private async sortByCategory(additionalSortParam: string = ''): Promise<void> {
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

      this.sortByMaxPrice('1000', '');
    });
  }
}
