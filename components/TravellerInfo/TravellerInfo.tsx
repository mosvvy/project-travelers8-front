import css from './TravellerInfo.module.css';
import { User } from '@/types/user';
import Image from 'next/image';

type TravellerInfoProps = {
  traveller: User;
};

export default function TravellerInfo({ traveller }: TravellerInfoProps) {
  return (
    <div className={css.travellerCard}>
      <Image
        src={traveller.avatarUrl || '/images/default-avatar.png'}
        alt={traveller.name}
        className={css.travellerAvatar}
        width={100}
        height={100}
      />

      <div className={css.travellerInfoWrapper}>
        <h2 className={css.travellerName}>{traveller.name}</h2>

        {traveller.description && (
          <p className={css.travellerDescription}>{traveller.description}</p>
        )}
      </div>
    </div>
  );
}
