import { API } from './api/api';

// SOME_PATH = '' / products / customers / categories / stores / orders / zones
const Api = new API('products', 20, 0);

async function start(): Promise<void> {
  try {
    const TEST_DATA = await Api.getProjectData();
    console.log(
      `Limit: ${TEST_DATA.limit}. Count from: ${TEST_DATA.offset}. Count: ${TEST_DATA.count}. Total: ${TEST_DATA.total}`
    );
    console.log('Data from Api.getProjectData()', TEST_DATA.results);
    // TEST_DATA.results.forEach(element => {
    //   console.log(element);
    // });
  } catch (error) {
    console.error('Error:', error);
  }
}
start();

// Api.registerUser('user@mail.ru', 'Name', 'Surname', 'secretTest01')
//   .then(() => {
//     console.log('success');
//     // Действия после успешной регистрации
//   })
//   .catch((error) => {
//     console.log(error);
//   });

Api.loginUser('user@mail.ru', 'secretTest01_')
  .then((data) => {
    console.log('login success', data);
    console.log(`Hi ${data.firstName} ${data.lastName}`);
  })
  .catch((error) => {
    console.log(error);
  });
