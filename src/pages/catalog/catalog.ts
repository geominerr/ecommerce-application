import TemplateView from '../template-view/template-view';
import ProductCard from '../../components/product-card/product-card';
import NavbarBreadcrumb from '../../components/navbar-breadcrumb/navbar-breadcrumb';
import Navbar from '../../components/navbar/navbar';
import InputSearch from '../../components/search/search';
import SelectSort from '../../components/select-sort/select-sort';
import Filter from '../../components/filter/filter';
import Buttons from './buttons/buttons';
import { NOT_FOUND_PRODUCT } from './not-found-product';
import { APIProductActions } from '../../api/product-actions/api-product-actions';
import { transform } from '../../utils/response-converter/response-converter';
import { TagNames, Styles } from './enum';
import './catalog.scss';
import { detectScrollDown } from '../../utils/detect_scroll_down';

export default class Catalog extends TemplateView {
  private container: HTMLDivElement;

  private loadingIndicator: HTMLDivElement;

  private prodContainer: HTMLDivElement;

  private cardContainer: HTMLDivElement;

  private sortContainer: HTMLDivElement;

  private buttonsGroup: HTMLElement;

  private navSidebar: HTMLDivElement;

  private navbarBreadcrumb: NavbarBreadcrumb;

  private navbar: Navbar;

  private api: APIProductActions;

  private selectSort: SelectSort;

  private filter: Filter;

  private inputSearch: InputSearch;

  private default_min_price: string;

  private default_max_price: string;

  private sortParams: string[] | null = null;

  private countries: string[] = [];

  private brands: string[] = [];

  private prices: string[] = [];

  private isLoading: boolean;

  private limit: number;

  private offsetCount: number;

  private isProductsEnd: boolean;

  private sortQueryOptions: string;

  constructor(api: APIProductActions) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CATALOG_CONTENT);
    this.loadingIndicator = this.createElement(TagNames.DIV, Styles.LOADING);
    this.prodContainer = this.createElement(TagNames.DIV, Styles.PROD_CONTAINER);
    this.cardContainer = this.createElement(TagNames.DIV, Styles.CARD_CONTAINER);
    this.sortContainer = this.createElement(TagNames.DIV, Styles.SORT_CONTAINER);
    this.navSidebar = this.createElement(TagNames.DIV, Styles.NAV_SIDEBAR);
    this.buttonsGroup = new Buttons().getElement();
    this.inputSearch = new InputSearch();
    this.selectSort = new SelectSort();
    this.filter = new Filter();
    this.navbarBreadcrumb = new NavbarBreadcrumb();
    this.navbar = new Navbar();
    this.api = api;
    this.default_min_price = '0'; // $
    this.default_max_price = '1000000'; // $
    this.addChangeHandler(
      this.selectSort.getElement(),
      this.inputSearch.getElement(),
      this.filter.getElement()
    );
    this.addButtonClickHandler();
    this.isLoading = false;
    this.limit = 10;
    this.offsetCount = 0;
    this.isProductsEnd = false;
    this.sortQueryOptions = '';
  }

  private documentTitle: string = 'Catalog';

  public async getHtml(): Promise<HTMLElement> {
    const {
      container,
      prodContainer,
      navbarBreadcrumb,
      navbar,
      navSidebar,
      cardContainer,
      filter,
    } = this;
    const { sortContainer, buttonsGroup } = this;
    const breadcrumbElement = navbarBreadcrumb.getElement();
    const navigationElement = navbar.getElement();
    const filterElement = filter.getElement();
    const searchElement = this.inputSearch.getElement();
    const sortElement = this.selectSort.getElement();

    navbarBreadcrumb.updateFromPathname();
    container.append(this.loadingIndicator);

    navSidebar.append(navigationElement);
    navSidebar.append(filterElement);
    [searchElement, sortElement].forEach((el) => sortContainer.append(el));
    [navSidebar, cardContainer].forEach((el) => prodContainer.append(el));
    [breadcrumbElement, buttonsGroup, sortContainer, prodContainer].forEach((el) =>
      container.append(el)
    );

    navbar.updateStateLinks();

    this.load(this.sortParams);

    return container;
  }

  // Отсюда начинается загрузка
  private load(sortParams?: string[] | null): void {
    // Очищаем контейнер перед отрисовкой и сбрасывваем ограничение
    this.cardContainer.innerHTML = '';
    this.offsetCount = 0;
    this.isProductsEnd = false;

    // добавил сохранение параметров сортировки в памяти приложения, теперь при переходах будет приментся сортировка
    if (sortParams) {
      const typeSort = sortParams[0];
      const directionSort = sortParams[1];
      this.sort(typeSort, directionSort);
    } else {
      this.filterByCategory();
    }
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }

  private async makeCard(
    searchParam: string = '',
    limit: number = 10,
    offset: number = 0
  ): Promise<void> {
    this.sortQueryOptions = searchParam;

    if (this.isLoading) return; // Также стоит использовать этот флаг для индикатора загрузузки
    this.isLoading = true;
    this.loadingIndicator.style.display = 'block';

    const CARD_DATA = await this.api.getProjectData(
      'product-projections',
      limit,
      offset,
      this.sortQueryOptions
    );
    this.isLoading = false;
    this.loadingIndicator.style.display = 'none';

    // лучше проверить прилетела ли дата,чтобы приложение не крашнуть на undefined/null.forEach()
    if (CARD_DATA.limit) {
      if (CARD_DATA.offset >= CARD_DATA.total - this.limit) {
        /* Проверка используется для того, чтобы остановить
        бесконечный скролл когда закончатся товары */
        console.log('end: ', CARD_DATA.total);
        this.isProductsEnd = true;
      }

      if (CARD_DATA.results.length) {
        CARD_DATA.results.forEach((res) => {
          const card = new ProductCard(transform(res)).getElement();
          this.cardContainer.append(card);
        });
      } else {
        this.cardContainer.innerHTML = NOT_FOUND_PRODUCT;
      }
    }
  }

  private createElement<T extends HTMLElement>(tagName: string, style: string): T {
    const element: T = document.createElement(tagName) as T;
    element.classList.add(style);

    return element;
  }

  /* Сортирует либо по алфавиту, либо по цене.
      Можно передать тип сортировки "price" или "name.en" направление "asc" и "desc". */
  private sort(
    sort_type: string = '',
    direction: string = '',
    brand: string[] = [''],
    country: string[] = [''],
    min_price: string = this.default_min_price,
    max_price = this.default_max_price,
    additionalSortParam = ''
  ): void {
    if (!direction) {
      direction = 'asc';
    }
    if (!sort_type) {
      sort_type = 'name.en';
    }

    this.filterByBrand(
      brand,
      country,
      min_price,
      max_price,
      `sort=${sort_type} ${direction}&${additionalSortParam}`
    );
  }

  /* Фильтрует по стране бренда. По умолчанию массив с пустой строкой.
      Те же условия что и у предыдущего метода. */
  private filterByBrand(
    brand: string[] = [''],
    country: string[] = [''],
    min_price: string = this.default_min_price,
    max_price = this.default_max_price,
    additionalSortParam = ''
  ): void {
    if (!brand[0]) {
      brand = ['exists'];
    } else {
      brand = brand.map((el) => `"${el}"`);
    }

    this.filterByRegistrationCountry(
      country,
      min_price,
      max_price,
      `filter=variants.attributes.brand:${brand}&${additionalSortParam}`
    );
  }

  /* Фильтрует по стране бренда. По умолчанию массив с пустой строкой.
      Вернет только те товавры, у которых есть атрибут страны. - Ключ "exists".
      Стоит позаботиться, чтобы у всех товаров было несколько общих атрибутов. */
  private filterByRegistrationCountry(
    country: string[] = [''],
    min_price: string = this.default_min_price,
    max_price = this.default_max_price,
    additionalSortParam = ''
  ): void {
    if (!country[0]) {
      country = ['exists'];
    } else {
      country = country.map((el) => `"${el}"`);
    }

    this.filterByMinPrice(
      min_price,
      max_price,
      `filter=variants.attributes.brand-registration-country:${country}&${additionalSortParam}`
    );
  }

  /* Фильтрует по минимальной цене. По умолчанию ноль.
      Принимает минимальную цену, максимальную цену и
      дополнительный параметр поиска/фильтра/сортирвки. */
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

  // Фильтрует по максимальной цене. По умолчанию миллион долларов.
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

  // Фильтрует по категории, если она есть после "/". Принимает дополнительный параметр поиска/фильтра/сортирвки.
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

  // Ищет по любой строке. регистронезависим.
  private search(search_string = ''): void {
    this.makeCard(`text.en="${search_string}"`);
  }

  // eslint-disable-next-line max-lines-per-function
  private addChangeHandler(
    selectSort: HTMLElement,
    inputSearch: HTMLElement,
    filter: HTMLElement
  ): void {
    selectSort.addEventListener('change', () => {
      // Очищаем контейнер перед отрисовкой и сбрасывваем ограничение
      this.cardContainer.innerHTML = '';
      this.offsetCount = 0;
      this.isProductsEnd = false;

      const params: string[] = this.selectSort.getValue();
      const typeSort = params[0];
      const directionSort = params[1];

      // сохраняем параметры сортиврке
      this.sortParams = [];
      this.sortParams.push(typeSort, directionSort);

      // Очищаем контейнер перед отрисовкой
      this.cardContainer.innerHTML = '';

      this.sort(typeSort, directionSort);
    });

    inputSearch.addEventListener('change', (e: Event) => {
      const { target } = e;

      if (target instanceof HTMLInputElement) {
        const searchParam = this.inputSearch.getValue();
        target.value = '';

        this.search(searchParam);
      }
    });

    filter.addEventListener('click', (e: Event) => {
      const { target } = e;
      this.countries = this.filter.getCountryValue();
      this.brands = this.filter.getBrandValue();
      this.prices = this.filter.getPriceValue();

      if (!this.sortParams || !this.sortParams[0]) {
        this.sortParams = ['', ''];
      }

      if (target instanceof HTMLButtonElement) {
        // Очищаем контейнер перед отрисовкой и сбрасывваем ограничение
        this.cardContainer.innerHTML = '';
        this.offsetCount = 0;
        this.isProductsEnd = false;

        // TODO: сделать так, чтобы работало при использовании сортировки.
        this.sort(
          this.sortParams[0],
          this.sortParams[1],
          this.brands,
          this.countries,
          this.prices[0],
          this.prices[1]
        );

        filter.querySelectorAll('input').forEach((el) => (el.checked = false)); // Удаить, если будет сохранение чекбоксов в память
      }
    });

    detectScrollDown((bool) => {
      console.log('scroll', bool, this.offsetCount, this.isProductsEnd);
      if (!this.isProductsEnd) {
        this.offsetCount += 10;
        this.makeCard(this.sortQueryOptions, this.limit, this.offsetCount);
      }
    }); // Проверяем скролл страницы вниз для бесконечнной загрузуи
  }

  private addButtonClickHandler(): void {
    const navbar = this.navbar.getElement();
    const filter = this.filter.getElement();

    document.body.addEventListener('click', (e) => {
      const { target } = e;

      if (target instanceof HTMLElement) {
        if (target.id === 'catalog-button') {
          navbar.classList.add('navbar--open');
          document.body.classList.add('lock');
        } else {
          if (navbar.classList.contains('navbar--open')) {
            navbar.classList.remove('navbar--open');
            document.body.classList.remove('lock');
          }
        }

        if (target.id === 'filter-button') {
          filter.classList.add('filter-container--open');
          document.body.classList.add('lock');
        } else if (target.id === 'close-btn-filter' || target.id === 'filter-btn') {
          filter.classList.remove('filter-container--open');
          document.body.classList.remove('lock');
        }
      }
    });
  }
}
