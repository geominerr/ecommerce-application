type ValidationFunction = (value: string) => string | null;

type ValidationPostal = (code: string, country: string) => string | null;

export { ValidationFunction, ValidationPostal };
