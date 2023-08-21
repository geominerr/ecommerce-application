import Button from '../../../../src/components/forms/button/button';

describe('Button', () => {
  it('getElement method should set text to "Login" for type "login"', () => {
    const button = new Button('login');
    const element = button.getElement();

    expect(element.innerText).toBe('Login');
  });

  it('getElement method should set text to "Registration" for type other than "signup"', () => {
    const button = new Button('signup');
    const element = button.getElement();

    expect(element.innerText).toBe('Registration');
  });

  it('getElement method should set TYPE attribute', () => {
    const button = new Button('login');
    const element = button.getElement();

    expect(element.getAttribute('type')).toBe('submit');
  });
});
