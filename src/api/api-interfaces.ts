interface Result {
  [key: string]: unknown;
}

export interface ProjectData {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Result[];
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token?: string;
}

export interface Customer {
  addresses: unknown[];
  authenticationMode: string;
  billingAddressIds: string[];
  createdAt: string;
  createdBy: { clientId: string; isPlatformClient: boolean };
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: { clientId: string; isPlatformClient: boolean };
  lastName: string;
  password: string;
  shippingAddressIds: string[];
  stores: unknown[];
  version: number;
  versionModifiedAt: string;
}

export interface CustomerResponse {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: {
    id: string;
    streetName: string;
    streetNumber: string;
    postalCode: string;
    city: string;
    country: string;
  }[];
  defaultShippingAddressId: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  stores: string[];
  authenticationMode: string;
}

export interface IPassFlow {
  password: string;
  username: string;
}

interface IAddress {
  streetName: string;
  streetNumber: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IUserData {
  addresses: IAddress[];
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shippingAddresses?: number[];
  billingAddresses?: number[];
  password: string;
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}
