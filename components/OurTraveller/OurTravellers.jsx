import css from './OurTravellers.module.css';
import TravellersList from '../TravellersList/TravellersList';
import { Link } from 'react-router-dom';

export default function OurTravellers() {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <h2 className={css.title}>Наші Мандрівники</h2>

        <TravellersList />

        <Link to='/travellers' className={css.button}>
          Переглянути всіх
        </Link>
      </div>
    </section>
  );
}
