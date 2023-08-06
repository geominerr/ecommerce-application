import { ProjectData } from './api-interfaces';
import { APIAcceesToken } from './api-acces-token';
import { CTP_PROJECT_KEY, CTP_API_URL } from './api-env-constants';

const API_ACCESS_TOKEN = new APIAcceesToken();

export class API {
  public CTP_PROJECT_KEY: string;

  public CTP_API_URL: string;

  public API_URL: string;

  public SOME_PATH: string;

  public LIMIT: number;

  public OFFSET: number;

  constructor(SOME_PATH = '', LIMIT = 20, OFFSET = 0) {
    this.SOME_PATH = SOME_PATH || '';
    this.LIMIT = LIMIT;
    this.OFFSET = OFFSET;

    this.CTP_PROJECT_KEY = CTP_PROJECT_KEY;
    this.CTP_API_URL = CTP_API_URL;

    this.API_URL = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/${SOME_PATH}?limit=${this.LIMIT}&offset=${this.OFFSET}`;
  }

  public async getProjectData(): Promise<ProjectData> {
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getAccessToken();
    console.log('Access Token: ', ACCESS_TOKEN, '\n');

    if (!ACCESS_TOKEN) throw new Error('Failed to obtain access token.');

    try {
      const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      };

      const response = await fetch(this.API_URL, {
        method: 'GET',
        headers: headers,
      });

      const projectData = await response.json();

      return projectData as ProjectData;
    } catch (error) {
      console.error('Error fetching Project data:', error);
      throw error;
    }
  }
}
