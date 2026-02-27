import css from './TravellerInfo.module.css';

type TravellerInfoProps = {
  traveller: {
    id: string;
    name: string;
    avatarUrl?: string;
    articlesAmount?: number;
    description?: string;
  };
};

export default function TravellerInfo({ traveller }: TravellerInfoProps) {
  return (
    <div className={css.container}>
      {traveller.avatarUrl && (
        <img src={traveller.avatarUrl} alt={traveller.name} className={css.travellerAvatar} />
      )}
      <div className={css.travellerInfoWrapper}>
        <h2 className={css.travellerName}>{traveller.name}</h2>

        {traveller.description && (
          <p className={css.travellerDescription}>{traveller.description}</p>
        )}
      </div>
    </div>
  );
}
