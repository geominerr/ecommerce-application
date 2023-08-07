export class RegAuthCheck {
  public constructorHolder: string;

  constructor() {
    this.constructorHolder = '';
  }

  public emailCheck(email: string): string | null {
    if (!email.includes('@')) {
      return 'The email address must contain the "@" symbol.';
    }
    const [localPart, domain] = email.split('@');
    if (!localPart || !domain) {
      return 'The email address must contain a local part and a domain name.';
    }
    if (email.trim() !== email) {
      return 'The email address must not contain any initial or final spaces.';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'The email address must be formatted like example@email.com';
    }
    // Все ок? - null
    return null;
  }
}
