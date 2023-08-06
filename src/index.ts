import { API } from './api/api';
import { APIUserActions } from './api/api-user-actions';

// SOME_PATH = '' / products / customers / categories / stores / orders / zones
const Api = new API('categories', 20, 0);
const USER_ACTIONS = new APIUserActions();

async function start(): Promise<void> {
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
start();

// email: string, firstName: string, lastName: string, title: string, shippingAddresses: number[], billingAddresses: number[], password: string
// function register(): void {
//   USER_ACTIONS.registerUser(
//     'MUuser@gmail3.com',
//     'MUuserName3',
//     'MUuserSurname3',
//     'Lord',
//     [],
//     [],
//     'secretMUuser'
//   )
//     .then(() => {
//       console.log('success');
//       // Действия после успешной регистрации
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
// register();

USER_ACTIONS.loginUser('MUuser@gmail3.com', 'secretMUuser')
  .then((data) => {
    console.log('login success', data);
    console.log(`Hi ${data.firstName} ${data.lastName}`);
  })
  .catch((error) => {
    console.log(error);
  });
