import css from './TravellersList.module.css';
import { User } from '@/types/user';
import Link from 'next/link';
import Image from 'next/image';

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
              <Image
                src={traveller.avatarUrl}
                alt={traveller.name}
                className={css.travellerAvatar}
                width={100}
                height={100}
              />
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
