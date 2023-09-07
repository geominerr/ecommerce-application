import { APIAcceesToken } from '../api-access-token';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../api-env-constants';

class APICartActions {
  private apiAccesToken: APIAcceesToken;

  private apiUrl: string = CTP_API_URL;

  private projectKey: string = CTP_PROJECT_KEY;

  constructor() {
    this.apiAccesToken = new APIAcceesToken();
  }

  public async createCart(): Promise<void> {
    const anonymousToken = (await this.apiAccesToken.getAnonymousToken()).access_token;
    const url = `${this.apiUrl}/${this.projectKey}/me/carts`;

    const headers = {
      Authorization: `Bearer ${anonymousToken}`,
      'Content-Type': 'application/json',
    };

    const data = {
      currency: 'EUR',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      return responseData.access_token;
    } catch (error) {
      throw error;
    }
  }
}

export default APICartActions;
