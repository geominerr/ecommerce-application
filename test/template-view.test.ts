import TemplateView from '../src/pages/template-view/template-view';

test('should return an empty string', async () => {
  const templateView = new TemplateView();
  const html = await templateView.getHtml();
  expect(html).toBe('');
});
