import { API } from './api/api';

// SOME_PATH = '' / products / customers / categories / stores / orders / zones
const Api = new API('products', 20, 0);

async function start(): Promise<void> {
  try {
    const TEST_DATA = await Api.getProjectData();
    console.log(
      `Limit: ${TEST_DATA.limit}. Count from: ${TEST_DATA.offset}. Count: ${TEST_DATA.count}. Total: ${TEST_DATA.total}`
    );
    console.log(TEST_DATA.results);
    // TEST_DATA.results.forEach(element => {
    //   console.log(element);
    // });
  } catch (error) {
    console.error('Error:', error);
  }
}
start();

// Api.registerUser('1111', 'test3@mail.com', 'testName3', 'tSurname3', 'secret134d')
//   .then(() => {
//     console.log('success');
//     // Действия после успешной регистрации
//   })
//   .catch((error) => {
//     console.log(error);
//   });
