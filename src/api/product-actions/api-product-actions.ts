import { ProjectData } from '../api-interfaces';
import { APIAcceesToken } from '../api-access-token';
import { CTP_PROJECT_KEY, CTP_API_URL } from '../api-env-constants';
import { IProductResponse } from '../api-interfaces';

const API_ACCESS_TOKEN = new APIAcceesToken();

export class APIProductActions {
  public CTP_PROJECT_KEY: string;

  public CTP_API_URL: string;

  constructor() {
    this.CTP_PROJECT_KEY = CTP_PROJECT_KEY;
    this.CTP_API_URL = CTP_API_URL;
  }

  // Используй для запроса кактлога !product-projections limit = 40!
  public async getProjectData(
    data_of: string = '',
    limit = 20,
    offset = 0,
    searchParam = ''
  ): Promise<ProjectData> {
    // data of  is: products / product-projections / customers / categories / stores / orders / zones
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getAccessToken();

    if (!ACCESS_TOKEN) throw new Error('Failed to obtain access token.');

    try {
      const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      };

      const response = await fetch(
        `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/${data_of}/search?${searchParam}&limit=${limit}&offset=${offset}`,
        {
          method: 'GET',
          headers: headers,
        }
      );

      const projectData = await response.json();
      return projectData as ProjectData;
    } catch (error) {
      throw error;
    }
  }

  private async searchByCategoryId(
    product_id: string = '',
    limit = 20,
    offset = 0
  ): Promise<ProjectData> {
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getAccessToken();

    if (!ACCESS_TOKEN) throw new Error('Failed to obtain access token.');

    try {
      const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      };

      const response = await fetch(
        `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/product-projections/search?filter=categories.id:"${product_id}"&limit=${limit}&offset=${offset}`,
        {
          method: 'GET',
          headers: headers,
        }
      );

      const projectData = await response.json();

      return projectData as ProjectData;
    } catch (error) {
      throw error;
    }
  }

  public async searchByCategoryName(
    idName = '',
    limit = 20,
    offset = 0
  ): Promise<ProjectData | null> {
    let result = null;

    await this.getProjectData('categories').then((p_data) => {
      const data = p_data.results;

      const categoryWithIdName = data.find(
        (item) => item.key === idName || item.externalId === idName
      );
      if (categoryWithIdName) {
        result = this.searchByCategoryId(String(categoryWithIdName.id), limit, offset);
      }
    });

    return result;
  }

  public async getProductByID(id: string): Promise<IProductResponse> {
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getAccessToken();

    if (!ACCESS_TOKEN) {
      throw new Error('Failed to obtain access token.');
    }

    const url: string = `https://api.europe-west1.gcp.commercetools.com/cyberpunk/product-projections/${id}`;

    try {
      const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      };

      const response: Response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      const projectData: IProductResponse = await response.json();

      return projectData;
    } catch (error) {
      throw error;
    }
  }
}
