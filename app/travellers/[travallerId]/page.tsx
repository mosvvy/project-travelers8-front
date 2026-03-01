import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import TravellerStories from '@/components/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import css from './page.module.css';
import Section from '@/components/Section/Section';

const DEFAULT_TRAVELLER_ID = '6881563901add19ee16fd017'; // 👈 тестовий

type PageProps = {
  params?: {
    travellerId?: string;
  };
};

export default async function TravellerPage({ params }: PageProps) {
  const travellerId = params?.travellerId ?? DEFAULT_TRAVELLER_ID;

  const res = await fetch(`https://project-travelers8-back.onrender.com/users/${travellerId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch traveller');
  }
  const data = await res.json();
  const traveller = data.user;
  const hasStories = traveller.savedStories?.length > 0;

  return (
    <>
      <TravellerInfo traveller={traveller} />
      <Section>
        <h2 className={css.travellerStoriesTitle}>Історії мандрівника</h2>
        {hasStories ? <TravellerStories /> : <MessageNoStories />}
      </Section>
    </>
  );
}
