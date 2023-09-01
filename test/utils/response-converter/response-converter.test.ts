import converteResponseData from '../../../src/utils/response-converter/response-converter';
import {
  IProductData,
  IProductResponse,
} from '../../../src/utils/response-converter/response-converter-interfaces';
import data from './data.json';

describe('converteResponseData function', () => {
  it('should return IProductData interface object from response json', () => {
    const equalObject: IProductData = {
      id: 'testId777',
      title: 'TestTitle',
      description: 'Test description',
      images: ['testImage1', 'testImage2', 'testImage3'],
      price: `€ ${(273900 / 100).toFixed(2)}`,
      attributes: [
        { name: 'Test1', value: 'test1' },
        { name: 'Test2', value: 'test2' },
        { name: 'Test3', value: 'test3' },
      ],
    };

    const result = converteResponseData(data as IProductResponse);

    expect(result).toEqual(equalObject);
  });
});
