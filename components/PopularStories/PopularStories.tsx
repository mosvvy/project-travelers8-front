import css from './PopularStories.module.css';
import TravellersList from '../TravellersList/TravellersList';
import type { Story } from '@/types/story';

const mockStories: Story[] = [
  {
    _id: '1',
    img: 'https://ftp.goit.study/img/travel-blog/68498236a100312bea07900b.webp',
    title: 'Єгипет: враження від Луксора',
    article: 'Луксор — це справжній музей під відкритим небом...',
    category: {
      _id: 'c1',
      name: 'Африка',
    },
    ownerId: {
      _id: 'u1',
      name: 'Назар Романенко',
      avatarUrl: 'https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd010.webp',
    },
    date: '2024-11-03',
    favoriteCount: 20,
  },
  {
    _id: '2',
    img: 'https://ftp.goit.study/img/travel-blog/685b12482dcb3c1a14d83a77.webp',
    title: 'Франція: вечірній Париж',
    article: 'Прогулянки Монмартром і кава з видом на Ейфелеву вежу...',
    category: {
      _id: 'c2',
      name: 'Європа',
    },
    ownerId: {
      _id: 'u2',
      name: 'Марія Коваль',
      avatarUrl: 'https://ftp.goit.study/img/harmoniq/users/685b12482dcb3c1a14d83a77.webp',
    },
    date: '2024-10-15',
    favoriteCount: 14,
  },
  {
    _id: '3',
    img: 'https://ftp.goit.study/img/travel-blog/685b12482dcb3c1a14d83a78.webp',
    title: 'Ісландія: край льоду і вогню',
    article: 'Гейзери, водоспади і чорні пляжі — магія півночі...',
    category: {
      _id: 'c3',
      name: 'Північна Європа',
    },
    ownerId: {
      _id: 'u3',
      name: 'Олег Савчук',
      avatarUrl: 'https://ftp.goit.study/img/harmoniq/users/685b12482dcb3c1a14d83a78.webp',
    },
    date: '2024-09-01',
    favoriteCount: 32,
  },
  {
    _id: '4',
    img: 'https://ftp.goit.study/img/travel-blog/685b12482dcb3c1a14d83a79.webp',
    title: 'Японія: сакура в Кіото',
    article: 'Храми, сади і цвітіння сакури — справжня медитація...',
    category: {
      _id: 'c4',
      name: 'Азія',
    },
    ownerId: {
      _id: 'u4',
      name: 'Ірина Петренко',
      avatarUrl: 'https://ftp.goit.study/img/harmoniq/users/685b12482dcb3c1a14d83a79.webp',
    },
    date: '2024-04-12',
    favoriteCount: 45,
  },
];

const PopularStories = () => {
  return <TravellersList stories={mockStories} />;
};

export default PopularStories;
