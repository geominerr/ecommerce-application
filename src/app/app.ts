import { API } from '../api/api';
import { APIUserActions } from '../api/api-user-actions';

const Api = new API('categories', 20, 0);
const USER_ACTIONS = new APIUserActions();

class App {
  // eslint-disable-next-line max-lines-per-function
  public start(): void {
    async function getData(): Promise<void> {
      try {
        const TEST_DATA = await Api.getProjectData();
        console.log(
          `Limit: ${TEST_DATA.limit}. Count from: ${TEST_DATA.offset}. Count: ${TEST_DATA.count}. Total: ${TEST_DATA.total}`
        );
        console.log('Data from Api.getProjectData()', TEST_DATA);
        // TEST_DATA.results.forEach(element => {
        //   console.log(element);
        // });
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getData();

    // SOME_PATH = '' / products / customers / categories / stores / orders / zones
    // email: string, firstName: string, lastName: string, dateOfBirth: string YYYY-MM-DD, shippingAddresses: number[], billingAddresses: number[], password: string
    function register(): void {
      USER_ACTIONS.registerUser(
        'Shipiing street',
        '123-s',
        'Shipping City',
        '0000-s',
        'US',
        'Billing street',
        '123-b',
        'Billing city',
        '0000-b',
        'US',
        'user@mail.com',
        'FirstuserName',
        'FirstuserSurname',
        '2010-11-10',
        'pAssw0rd!'
      )
        .then(() => {
          console.log('success');
          // Действия после успешной регистрации
        })
        .catch((error) => {
          console.log(error);
        });
    }
    register();

    USER_ACTIONS.loginUser('user@mail.com', 'pAssw0rd!')
      .then((data) => {
        console.log('login success', data);
        console.log(`Hi ${data.firstName} ${data.lastName}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default App;
