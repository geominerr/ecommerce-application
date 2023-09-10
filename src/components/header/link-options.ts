import { ILinkOptions } from './header-interfaces';

const LINKS_OPTIONS: ILinkOptions[] = [
  { href: '/about_us', content: 'About us' },
  { href: '/catalog', content: 'Catalog' },
];

const LINKS_OPTIONS_USER: ILinkOptions[] = [
  { href: '/authorization', content: 'Login' },
  { href: '/registration', content: 'Registration' },
  { href: '/profile', imgPath: '../../assets/svg/profile.svg' },
  { href: '/cart', imgPath: '../../assets/svg/cart.svg' },
];

const LOGO_OPTIONS: ILinkOptions = {
  href: '/',
  imgPath: '../../assets/svg/music-universe.svg',
};

export { LINKS_OPTIONS, LINKS_OPTIONS_USER, LOGO_OPTIONS };
