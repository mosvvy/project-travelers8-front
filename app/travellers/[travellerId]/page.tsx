import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import TravellerStories from '@/components/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import css from './page.module.css';
import Section from '@/components/Section/Section';

type PageProps = {
  params: Promise<{
    travellerId: string;
  }>;
};

export default async function TravellerPage({ params }: PageProps) {
  const { travellerId } = await params;

  const res = await fetch(`https://project-travelers8-back.onrender.com/users/${travellerId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch traveller');
  }
  const data = await res.json();
  const traveller = data.user;
  const hasStories = traveller.savedStories?.length > 0;

  const text = 'Цей користувач ще не опублікував історій';
  const buttonText = 'Назад до історій';

  return (
    <>
      <Section>
        <TravellerInfo traveller={traveller} />
      </Section>
      <Section>
        <h2 className={css.travellerStoriesTitle}>Історії мандрівника</h2>
        {hasStories ? (
          <TravellerStories stories={traveller.savedStories} />
        ) : (
          <MessageNoStories text={text} buttonText={buttonText} />
        )}
      </Section>
    </>
  );
}
