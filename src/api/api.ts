import { Customer, ProjectData } from './api-interfaces';
import { APIAcceesToken } from './api-access-token';
import { CTP_PROJECT_KEY, CTP_API_URL } from './api-env-constants';

const API_ACCESS_TOKEN = new APIAcceesToken();

export class API {
  public CTP_PROJECT_KEY: string;

  public CTP_API_URL: string;

  public LIMIT: number;

  public OFFSET: number;

  constructor(LIMIT = 20, OFFSET = 0) {
    this.LIMIT = LIMIT;
    this.OFFSET = OFFSET;

    this.CTP_PROJECT_KEY = CTP_PROJECT_KEY;
    this.CTP_API_URL = CTP_API_URL;
  }

  public async getProjectData(data_of: string = ''): Promise<ProjectData> {
    // data of  is: products / product-projections / customers / categories / stores / orders / zones
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getAccessToken();
    console.log('Access Token: ', ACCESS_TOKEN, '\n');

    if (!ACCESS_TOKEN) throw new Error('Failed to obtain access token.');

    try {
      const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      };

      const response = await fetch(
        `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/${data_of}?limit=${this.LIMIT}&offset=${this.OFFSET}`,
        {
          method: 'GET',
          headers: headers,
        }
      );

      const projectData = await response.json();
      return projectData as ProjectData;
    } catch (error) {
      console.error('Error fetching Project data:', error);
      throw error;
    }
  }

  public async searchByCategoryId(product_id: string = ''): Promise<ProjectData> {
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getAccessToken();
    console.log('Access Token: ', ACCESS_TOKEN, '\n');

    if (!ACCESS_TOKEN) throw new Error('Failed to obtain access token.');

    try {
      const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      };

      const response = await fetch(
        `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/product-projections/search?filter=categories.id:"${product_id}"&limit=${this.LIMIT}&offset=${this.OFFSET}`,
        {
          method: 'GET',
          headers: headers,
        }
      );

      const projectData = await response.json();

      return projectData as ProjectData;
    } catch (error) {
      console.error('Error fetching Project data:', error);
      throw error;
    }
  }

  public async getCustomer(): Promise<Customer> {
    // const userId = localStorage.getItem('userID');
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getAccessToken();
    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me`;

    if (!ACCESS_TOKEN) throw new Error('Failed to obtain access token.');

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`${await response.json().then((data) => data.message)}`);
      }
    } catch (error) {
      throw error;
    }
  }
}
