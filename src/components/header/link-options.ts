import { ILinkOptions } from './header-interfaces';

const LINKS_OPTIONS: ILinkOptions[] = [
  { href: '/headphones', content: 'Headphones' },
  { href: '/speakers', content: 'Speakers' },
  { href: '/turntables', content: 'Turntables' },
  { href: '/amplifiers', content: 'Amplifiers' },
  { href: '/controllers', content: 'Controllers' },
  { href: '/soundbars', content: 'Soundbars' },
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
