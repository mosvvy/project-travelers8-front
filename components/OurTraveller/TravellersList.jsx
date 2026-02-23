import css from './TravellersList.module.css';
import TravellerCard from '../TravellerCard/TravellerCard';

const travellers = [
  {
    id: 1,
    name: 'Анастасія Олійник',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    avatar: '/images/traveller1.jpg',
  },
  {
    id: 2,
    name: 'Назар Ткаченко',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    avatar: '/images/traveller2.jpg',
  },
  {
    id: 3,
    name: 'Єва Бондаренко',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    avatar: '/images/traveller3.jpg',
  },
  {
    id: 4,
    name: 'Дмитро Романенко',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    avatar: '/images/traveller4.jpg',
  },
];

export default function TravellersList() {
  return (
    <ul className={css.list}>
      {travellers.map(traveller => (
        <li key={traveller.id}>
          <TravellerCard traveller={traveller} />
        </li>
      ))}
    </ul>
  );
}
