import css from './TravellerInfo.module.css';
import { User } from '@/types/user';
import Image from 'next/image';
import Section from '../Section/Section';

type TravellerInfoProps = {
  traveller: User;
};

export default function TravellerInfo({ traveller }: TravellerInfoProps) {
  return (
    <Section>
      <div className={css.travellerCard}>
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
            <p className={css.travellerDescription}>{traveller.description}</p>
          )}
        </div>
      </div>
    </Section>
  );
}
