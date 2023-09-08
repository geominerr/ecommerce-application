import { APIAcceesToken } from '../api-access-token';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../api-env-constants';
import { IResponseDiscount } from './api-discount-actions-interfaces';

const API_ACCESS_TOKEN = new APIAcceesToken();

class APIDiscountActions {
  public async getDiscountCodes(): Promise<void> {
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getAdminAccessToken();

    if (!ACCESS_TOKEN) throw new Error('Failed to obtain access token.');

    try {
      const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      };

      const response: Response = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/discount-codes`, {
        method: 'GET',
        headers: headers,
      });

      const discounts: IResponseDiscount = await response.json();
      // покажет discountCodeS которые можно применит
      for (const discount of discounts.results) {
        const name = discount.name.en;
        const code = discount.code;
        const id = discount.id;

        console.log({ name, code, id });
      }

      console.log(discounts);
    } catch (error) {
      throw error;
    }
  }
}

export default APIDiscountActions;
