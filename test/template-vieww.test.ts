import TemplateView from '../src/pages/template-view/template-view';

test('should set the document title correctly when provided with a valid input', () => {
  const templateView = new TemplateView();
  templateView.setTitle('Valid Title');
  expect(document.title).toBe('Valid Title');
});

test('should return an empty string', async () => {
  const templateView = new TemplateView();
  const html = await templateView.getHtml();
  expect(html).toBe('');
});
