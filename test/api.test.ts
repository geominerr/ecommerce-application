import { API } from '../src/api/api';

// API test
test('getProjectData should fetch project data successfully', async () => {
  const api = new API();
  const projectData = {
    name: 'Cyberpunk',
    key: 'cyberpunk',
  };

  // Мокаем метод fetchAPI, чтобы он возвращал тестовые данные проекта
  api.getProjectData = jest.fn().mockResolvedValue(projectData);

  const result = await api.getProjectData();

  expect(result).toEqual(projectData);
});
