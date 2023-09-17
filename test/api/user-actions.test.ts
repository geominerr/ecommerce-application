/* eslint-disable max-lines-per-function */
import { APIUserActions } from '../../src/api/api-user-actions';

describe('APIUserActions', () => {
  let apiUserActions: APIUserActions;

  beforeEach(() => {
    apiUserActions = new APIUserActions();
  });

  test('loginUser should throw an error when response status is not 200', async () => {
    // Arrange
    const email = 'test@example.com';
    const password = 'password';
    const fetchMock = jest.fn().mockResolvedValue({
      status: 400,
      json: jest.fn().mockResolvedValue({ message: 'Failed to obtain access token.' }),
    });
    global.fetch = fetchMock;

    // Act & Assert
    await expect(apiUserActions.loginUser(email, password)).rejects.toThrowError(
      'Failed to obtain access token.'
    );
  });
});
