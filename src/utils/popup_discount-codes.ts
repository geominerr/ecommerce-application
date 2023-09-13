import { Popup } from '../components/popup/popup';
import APIDiscountActions from '../api/discount-actions/api-discount-actions';

// Функция для отображения скидочных кодов во всплывающем окне
export async function popupDiscount(): Promise<void> {
  try {
    const arrCodes: string[] = [];

    const api = new APIDiscountActions();
    const popup = new Popup();

    const codes = await api.getDiscountCodes();

    codes.results.forEach((code) => {
      arrCodes.push(code.code);
    });

    if (arrCodes[0]) {
      popup.showDiscountCodes(arrCodes.join(', '));
    } else {
      popup.showDiscountCodesEmpty();
    }
  } catch (error) {
    console.error('Error displaying discount codes:', error);
  }
}
