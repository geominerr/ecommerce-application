import { Styles } from '../../../../src/components/forms/error-hint/enum';
import ErrorHint from '../../../../src/components/forms/error-hint/error-hint';

describe('ErrorHint', () => {
  const errorHint: ErrorHint = new ErrorHint();

  it('should create an instance of ErrorHint', () => {
    expect(errorHint).toBeInstanceOf(ErrorHint);
  });

  it('showErrorText should display error text and add styles', () => {
    const errorHintElement = errorHint.getElement();
    const errorText = 'Error';

    errorHint.showErrorText(errorText);
    expect(errorHintElement.innerText).toBe(errorText);
    expect(errorHintElement.classList.contains(Styles.VISIBLE)).toBe(true);
  });

  it('showErrorText should remove styles', () => {
    const errorHintElement = errorHint.getElement();
    const errorText = 'Error';

    expect(errorHintElement.innerText).toBe(errorText);
    expect(errorHintElement.classList.contains(Styles.VISIBLE)).toBe(true);

    errorHint.hideErrorText();
    expect(errorHintElement.classList.contains(Styles.VISIBLE)).toBe(false);
  });
});
