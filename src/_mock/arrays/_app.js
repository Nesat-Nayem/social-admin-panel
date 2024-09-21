import _mock from '../_mock';
import { randomNumberRange, randomInArray } from '../utils';

// ----------------------------------------------------------------------

export const _appRelated = [
  'Dr. Ajaya Nand Jha',
  'Dr. Suresh Joshi',
  'Dr. Abhijit Dey',
  'Dr. Aroop Mukherjee',
  'Dr. Deep Mukherjee',
].map((name, index) => ({
  id: _mock.id(index),
  name,
  system: (index === 2 && 'orthopedics') || (index === 4 && 'dermatology') || 'radiology',
  price: index === 0 || index === 2 || index === 4 ? 0 : _mock.number.price(index),
  rating: _mock.number.rating(index),
  review: randomNumberRange(999, 99999),
  // shortcut:
  //   (name === 'Dr. Ajaya Nand Jha' && '/assets/icons/apps/ic_chrome.svg') ||
  //   (name === 'Dr. Suresh Joshi' && '/assets/icons/apps/ic_drive.svg') ||
  //   (name === 'Dr. Abhijit Dey' && '/assets/icons/apps/ic_dropbox.svg') ||
  //   (name === 'Dr. Aroop Mukherjee' && '/assets/icons/apps/ic_evernote.svg') ||
  //   '/assets/icons/apps/ic_github.svg',
}));

// ----------------------------------------------------------------------

export const _appInstalled = ['de', 'en', 'fr', 'kr', 'us'].map((country, index) => ({
  id: _mock.id(index),
  name: ['Germany', 'England', 'France', 'Korean', 'USA'][index],
  android: randomNumberRange(999, 99999),
  windows: randomNumberRange(999, 99999),
  apple: randomNumberRange(999, 99999),
  flag: `/assets/icons/flags/ic_flag_${country}.svg`,
}));

// ----------------------------------------------------------------------

export const _appAuthors = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  avatar: _mock.image.avatar(index),
  favourite: randomNumberRange(9999, 19999),
}));

// ----------------------------------------------------------------------

export const _appInvoices = [...Array(5)].map((_, index) => ({
  id: `${Date.now() + index}`,
  price: _mock.number.price(index),
  category: randomInArray(['Horlicks', 'Bornvita', 'Complan']),
  status: randomInArray(['paid', 'out_of_stock', 'in_progress', 'pending']),
}));

// ----------------------------------------------------------------------

export const _appFeatured = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  title: [
    'Harry Potter and the Deathly Hallows - Part 2',
    'Disney Zombies 2',
    'Lightroom mobile - Koloro',
  ][index],
  description: _mock.text.title(index),
  image: _mock.image.cover(index),
}));
