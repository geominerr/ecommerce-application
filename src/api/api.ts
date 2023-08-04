// eslint-disable-next-line import/no-extraneous-dependencies
// import dotenv from 'dotenv';
// dotenv.config(); // временно отключен, пока не разобрались с dotenv

import { ProjectData, AccessTokenResponse, Customer } from './api-interfaces';

export class API {
  public CTP_PROJECT_KEY: string;

  public CTP_CLIENT_ID: string;

  public CTP_CLIENT_SECRET: string;

  public CTP_SCOPES: string;

  public CTP_AUTH_URL: string;

  public CTP_API_URL: string;

  public AUTH_URL: string;

  public API_URL: string;

  public SOME_PATH: string;

  public LIMIT: number;

  public OFFSET: number;

  constructor(SOME_PATH = '', LIMIT = 20, OFFSET = 0) {
    this.SOME_PATH = SOME_PATH || '';
    this.LIMIT = LIMIT;
    this.OFFSET = OFFSET;

    this.CTP_PROJECT_KEY = 'cyberpunk'; //process.env.CTP_PROJECT_KEY || '';
    this.CTP_CLIENT_ID = 'R3J19Gte-bQHY8Sobvs_PO2T'; //process.env.CTP_CLIENT_ID || '';
    this.CTP_CLIENT_SECRET = 'DP_dZgAs5hVy_ZIGEUBlNCdYpb3h4Z5k'; //process.env.CTP_CLIENT_SECRET || '';
    this.CTP_SCOPES = 'manage_project:cyberpunk'; //process.env.CTP_SCOPES || '';
    this.CTP_AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com'; //process.env.CTP_AUTH_URL || '';
    this.CTP_API_URL = 'https://api.europe-west1.gcp.commercetools.com'; //process.env.CTP_API_URL || '';

    this.AUTH_URL = `${this.CTP_AUTH_URL}/oauth/token`;
    this.API_URL = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/${SOME_PATH}?limit=${this.LIMIT}&offset=${this.OFFSET}`;
  }

  private async getAccessToken(): Promise<string> {
    const url = this.AUTH_URL;
    const credentials = `${this.CTP_CLIENT_ID}:${this.CTP_CLIENT_SECRET}`;
    const authHeader = 'Basic ' + btoa(credentials); // Use btoa to encode credentials

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('scope', `${this.CTP_SCOPES}`);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      const responseData = (await response.json()) as AccessTokenResponse;
      console.log('Response: ', responseData);
      console.log(
        'Token lifetime: ',
        (responseData.expires_in / 60 / 60).toFixed(2),
        'hours.',
        'RAW: ',
        responseData.expires_in,
        '\n'
      );

      return responseData.access_token;
    } catch (error) {
      console.error('Error obtaining access token:', error);
      throw error;
    }
  }

  public async getProjectData(): Promise<ProjectData> {
    const accessToken = await this.getAccessToken();

    console.log('Access Token: ', accessToken, '\n');

    if (!accessToken) throw new Error('Failed to obtain access token.');

    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(this.API_URL, {
        headers: headers,
      });

      const projectData = await response.json();

      return projectData as ProjectData;
    } catch (error) {
      console.error('Error fetching Project data:', error);
      throw error;
    }
  }

  // eslint-disable-next-line max-lines-per-function
  public async registerUser(
    // поля нужно будет добавить, если возникнет необходимость
    // https://docs.commercetools.com/api/projects/customers#ctp:api:type:CustomerDraft
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<void> {
    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/customers`;
    const accessToken = await this.getAccessToken();

    if (!accessToken) throw new Error('Failed to obtain access token.');

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const userData = {
      email,
      firstName,
      lastName,
      password,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        console.log('User registration successful.');
      } else {
        throw new Error(`User registration failed: ${await response.text()}`);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  public async loginUser(
    email: string,
    password: string,
    anonymousCart?: { id: string; typeId: string }
  ): Promise<Customer> {
    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/login`;
    const accessToken = await this.getAccessToken();

    if (!accessToken) throw new Error('Failed to obtain access token.');

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const userData = {
      email,
      password,
      anonymousCart,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('User log in successful.');
        return data.customer;
      } else {
        throw new Error(`${await response.json().then((data) => data.message)}`);
      }
    } catch (error) {
      throw error;
    }
  }
}
