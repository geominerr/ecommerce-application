type ValidationFunction = (value: string) => string | null;

type ValidationPostal = (code: string, country: string) => string | null;

interface IAddress {
  streetName: string;
  streetNumber: string;
  city: string;
  postalCode: string;
  country: string;
}

interface IUserData {
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

export { ValidationFunction, ValidationPostal, IAddress, IUserData };
