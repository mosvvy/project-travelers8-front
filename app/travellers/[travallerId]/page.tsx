import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import TravellerStories from '@/components/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

const DEFAULT_TRAVELLER_ID = '6881563901add19ee16fd017'; // 👈 тестовий

type PageProps = {
  params?: {
    travellerId?: string;
  };
};

export default async function TravelerPage({ params }: PageProps) {
  const travellerId = params?.travellerId ?? DEFAULT_TRAVELLER_ID;

  const res = await fetch(`https://project-travelers8-back.onrender.com/users/${travellerId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch traveller');
  }
  const data = await res.json();
  const traveller = data.user;

  return (
    <>
      <Header />
      <TravellerInfo traveller={traveller} />
      <TravellerStories />
      <MessageNoStories />
      <Footer />
    </>
  );
}
