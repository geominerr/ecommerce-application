export class AddressCheck {
  public constructorHolder: string;

  constructor() {
    this.constructorHolder = '';
  }

  public streetCheck(street: string): string | null {
    if (street.length < 1) {
      return 'The address must be at least 1 character long.';
    }
    // Все ок? - null
    return null;
  }

  public cityCheck(city: string): string | null {
    const regex = /^[a-zA-Z]*[a-zA-Z][a-zA-Z]*$/;
    if (!regex.test(city)) {
      return 'The city must contain at least one character and no special characters or numbers.';
    }
    // Все ок? - null
    return null;
  }

  public postalCodeCheck(code: string, country: string): string | null {
    let length = 1;
    switch (country) {
      case 'LT':
        length = 7;
        break;

      case 'LV' || 'MD' || 'RO' || 'RU' || 'BY' || 'CN':
        length = 6;
        break;

      case 'US' || 'MX' || 'UA' || 'PL' || 'SK' || 'FI' || 'FR' || 'GR' || 'IT' || 'TR' || 'ES':
        length = 5;
        break;

      case 'HU' || 'NO' || 'PT' || 'CH' || 'SI':
        length = 4;
        break;

      case 'DE' || 'GB':
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
