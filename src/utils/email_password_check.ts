export class EmailPasswordCheck {
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

  public passwordCheck(password: string): string | null {
    if (password.length < 8) {
      return 'The password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'The password must contain at least one capital letter (A-Z).';
    }
    if (!/[a-z]/.test(password)) {
      return 'The password must contain at least one lowercase letter (a-z).';
    }
    if (!/\d/.test(password)) {
      return 'The password must contain at least one digit (0-9).';
    }
    if (password.trim() !== password) {
      return 'The password must not contain any initial or final spaces.';
    }
    // Все ок? - null
    return null;
  }

  public strengthOfPasswordCheck(password: string): string {
    const mediumPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    const strongPasswordRegex =
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;

    if (strongPasswordRegex.test(password)) {
      return 'Strong password.';
    } else if (mediumPasswordRegex.test(password)) {
      return 'Medium password strength.';
    } else {
      return 'Weak password.';
    }
  }
}
