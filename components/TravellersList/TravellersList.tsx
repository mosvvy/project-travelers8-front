import css from './TravellersList.module.css';
import { User } from '@/types/User';
import Link from 'next/link';

type TravellersListProps = {
  travellers: User[];
};

const TravellersList = ({ travellers }: TravellersListProps) => {
  return (
    <ul className={css.travellerListContainer}>
      {travellers.map(traveller => (
        <li key={traveller._id} className={css.travellerListItem}>
          <div>
            {traveller.avatarUrl && (
              <img src={traveller.avatarUrl} alt={traveller.name} className={css.travellerAvatar} />
            )}
            <div className={css.travellerInfoWrapper}>
              <h2 className={css.travellerName}>{traveller.name}</h2>

              {traveller.description && (
                <p className={css.travellerDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim
                  in eros
                </p>
              )}
              <Link href='/' className={css.travellerProfileLink}>
                Переглянути профіль
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TravellersList;
