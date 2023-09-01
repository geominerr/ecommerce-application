import { ILinkOptionsNav } from './navbar-interfaces';

const LINKS_OPTIONS: ILinkOptionsNav[] = [
  { id: 'catalog', href: '/catalog', content: 'All' },
  { id: 'amplifiers', href: '/catalog/amplifiers', content: 'Amplifiers' },
  { id: 'controllers', href: '/catalog/controllers', content: 'Controllers' },
  { id: 'headphones', href: '/catalog/headphones', content: 'Headphones' },
  { id: 'turntables', href: '/catalog/turntables', content: 'Turntables' },
  { id: 'sound-systems', href: '/catalog/sound-systems', content: 'Sound systems' },
];

export default LINKS_OPTIONS;
