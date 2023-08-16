export class AddressCheck {
  public constructorHolder: string;

  constructor() {
    this.constructorHolder = '';
  }

  public mainCheck(word: string): string | null {
    // Используй для проверки города, имени и фамилии.
    const regex = /^[a-zA-Z]*[a-zA-Z][a-zA-Z]*$/;
    if (!regex.test(word)) {
      return 'The name / surname / city must contain at least one letter and no no special characters or numbers.';
    }
    // Все ок? - null
    return null;
  }

  public ageCheck(age: string): string | null {
    const currentDate = new Date();
    const birthDate = new Date(age);

    const ageInMilliseconds = +currentDate - +birthDate;
    const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);

    if (ageInYears < 13) {
      return 'Get out of here, little sucker.';
    } else if (ageInYears > 100) {
      return 'You should be dead.';
    }
    // Все ок? - null
    return null;
  }

  public streetCheck(street: string): string | null {
    if (street.length < 1) {
      return 'The address must be at least 1 character long.';
    }
    // Все ок? - null
    return null;
  }

  // eslint-disable-next-line max-lines-per-function
  public postalCodeCheck(code: string, country: string): string | null {
    let length = 1;
    switch (country) {
      case 'LT':
        length = 7;
        break;

      case 'LV':
      case 'MD':
      case 'RO':
      case 'RU':
      case 'BY':
      case 'CN':
        length = 6;
        break;

      case 'US':
      case 'MX':
      case 'UA':
      case 'PL':
      case 'SK':
      case 'FI':
      case 'FR':
      case 'GR':
      case 'IT':
      case 'TR':
      case 'ES':
        length = 5;
        break;

      case 'HU':
      case 'NO':
      case 'PT':
      case 'CH':
      case 'SI':
        length = 4;
        break;

      case 'DE':
      case 'GB':
        length = 2;
        break;

      default:
        length = 1;
    }
    if (code.length < length) {
      return `Zip code required length ${length} characters!`;
    }
    // Все ок? - null
    return null;
  }

  public countryCheck(country: string): string | null {
    const countryMap: { [key: string]: string } = {
      Belarus: 'BY',
      China: 'CN',
      Germany: 'DE',
      Spain: 'ES',
      Finland: 'FI',
      France: 'FR',
      'United Kingdom': 'GB',
      Greece: 'GR',
      Hungary: 'HU',
      Italy: 'IT',
      Lithuania: 'LT',
      Latvia: 'LV',
      Moldova: 'MD',
      Mexico: 'MX',
      Norway: 'NO',
      Poland: 'PL',
      Portugal: 'PT',
      Romania: 'RO',
      Russia: 'RU',
      Slovakia: 'SK',
      Slovenia: 'SI',
      Turkey: 'TR',
      Ukraine: 'UA',
      'United States': 'US',
    };

    if (countryMap.hasOwnProperty(country)) {
      return countryMap[country];
    } else {
      // Страны нет в сипске? - null
      return null;
    }
  }
  // countryCheck работает обратно предыдущим проверкам
  // страна из списка - возвращаем код страны, который
  // затем мы должны передать в метод регистрации как
  // страну (country_shipping, country_billing).
}
