import TemplateView from '../template-view/template-view';
import './catalog.scss';
import { APIProductActions } from '../../api/product-actions/api-product-actions';
import { RawProductData, ProductData, IProductImage } from './catalog-interfaces';

import ProductCard from '../../components/product-card/product-card';

export default class Catalog extends TemplateView {
  private container: HTMLDivElement;

  private card_container: HTMLDivElement;

  private nav_sidebar: HTMLDivElement;

  private api: APIProductActions;

  constructor(api: APIProductActions) {
    super();
    this.container = this.createElement('div', 'catalog-content');
    this.card_container = this.createElement('div', 'card-container');
    this.nav_sidebar = this.createElement('div', 'nav-sidebar');
    this.api = api;
  }

  private documentTitle: string = 'Catalog';

  public async getHtml(): Promise<HTMLElement> {
    this.container.append(this.nav_sidebar);
    this.container.append(this.card_container);
    return this.container;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
    this.makeCard();
  }

  private async makeCard(): Promise<void> {
    const CARD_DATA = await this.api.getProjectData('product-projections', 20, 0);

    // лучше проверить прилетела ли дата,чтобы приложение не крашнуть на undefined/null.forEach()
    if (CARD_DATA) {
      // чистим контейнер а иначе там будут сотни карточек при каждом новом клике по catalog link
      this.card_container.innerHTML = '';

      CARD_DATA.results.forEach((res) => {
        console.log('transformed', this.transform(res));
        //  типа вот так new ProductCard(converteResponseData(rec)

        const card = new ProductCard(this.transform(res)).getElement();
        this.card_container.append(card);
      });
    }
  }

  // по хорошему может это отдельно повыносить в helpers/utils типа converteResponseData() и вызывть в методе выше
  private transform(data: RawProductData): ProductData {
    const { id, name, masterVariant } = data;
    const images: string[] = data.masterVariant.images.map(
      (imageData: IProductImage): string => imageData.url
    );
    const priceNumber: number = masterVariant.prices[0].value.centAmount;
    const price: string = `€ ${(priceNumber / 100).toFixed(2)}`;

    const transformed: ProductData = {
      id,
      name: name.en,
      img: images,
      price: price,
    };

    return transformed;
  }

  private createElement<T extends HTMLElement>(tagName: string, style: string): T {
    const element: T = document.createElement(tagName) as T;
    element.classList.add(style);

    return element;
  }
}
