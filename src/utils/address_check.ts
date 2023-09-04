export class AddressCheck {
  public constructorHolder: string;

  constructor() {
    this.constructorHolder = '';
  }

  public cityCheck(word: string): string | null {
    // Используй для проверки города, имени и фамилии.
    const regex = /^[a-zA-Z]*[a-zA-Z][a-zA-Z]*$/;
    if (!regex.test(word)) {
      return 'The city must contain at least one letter and no special characters or numbers.';
    }
    // Все ок? - null
    return null;
  }

  public firstNameCheck(word: string): string | null {
    // Используй для проверки города, имени и фамилии.
    const regex = /^[a-zA-Z]*[a-zA-Z][a-zA-Z]*$/;
    if (!regex.test(word)) {
      return 'The firstname must contain at least one letter and no special characters or numbers.';
    }
    // Все ок? - null
    return null;
  }

  public lastNameCheck(word: string): string | null {
    // Используй для проверки города, имени и фамилии.
    const regex = /^[a-zA-Z]*[a-zA-Z][a-zA-Z]*$/;
    if (!regex.test(word)) {
      return 'The lastname must contain at least one letter and no special characters or numbers.';
    }
    // Все ок? - null
    return null;
  }

  public ageCheck(age: string): string | null {
    const currentDate = new Date();
    const birthDate = new Date(age);

    const ageInMilliseconds = +currentDate - +birthDate;
    const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);

    if (ageInYears - 0.009 < 13) {
      return 'Unfortunately, you cannot register on this platform as the minimum age is 13.';
    } else if (ageInYears - 0.069 > 100) {
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
    let message: string = '';
    let regex: RegExp;

    switch (country) {
      case 'BY':
        regex = /^\d{6}$/;
        if (!regex.test(code)) {
          message = 'The zip code must be formatted like XXXXXX, X - number';
        }
        break;

      case 'LT':
        regex = /^LT-\d{5}$/;
        if (!regex.test(code)) {
          message = 'The zip code must be formatted like LT-XXXXX, X - number';
        }
        break;

      case 'LV':
        regex = /^LV-\d{4}$/;
        if (!regex.test(code)) {
          message = 'The zip code must be formatted like LV-XXXX, X - number';
        }
        break;

      case 'PL':
        regex = /^\d{2}-\d{3}$/;
        if (!regex.test(code)) {
          message = 'The zip code must be formatted like XX-XXX, X - number';
        }
        break;

      case 'RU':
        regex = /^\d{6}$/;
        if (!regex.test(code)) {
          message = 'The zip code must be formatted like XXXXXX, X - number';
        }
        break;

      case 'UA':
        regex = /^\d{5}$/;
        if (!regex.test(code)) {
          message = 'The zip code must be formatted like XXXXX, X - number';
        }
        break;
    }

    if (message) {
      return message;
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
