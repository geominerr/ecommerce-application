import { API } from '../api/api';
import { APIUserActions } from '../api/api-user-actions';

const Api = new API(30, 0);
const USER_ACTIONS = new APIUserActions();

class App {
  // eslint-disable-next-line max-lines-per-function
  public start(): void {
    async function getData(): Promise<void> {
      try {
        const DATA_FULL = await Api.getProjectData('product-projections');
        const DATA_BY_ID = await Api.searchByCategoryId('58b8811c-48c4-4b65-92ef-55607b7d0deb');

        console.log('Data from Api in App FULL', DATA_FULL);
        console.log('Data from Api in App BY_ID', DATA_BY_ID);
        // TEST_DATA.results.forEach(element => {
        //   console.log(element);
        // });
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getData();

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
          console.log('Register error in APP: ', error.message);
        });
    }
    register();

    USER_ACTIONS.loginUser('user@mail.com', 'pAssw0rd!')
      .then((data) => {
        console.log('login success', data);
        console.log(`Hi ${data.firstName} ${data.lastName}`);
      })
      .catch((error) => {
        console.log('Login error in APP: ', error.message);
      });
  }
}

export default App;
