import { fetchStoryServer } from '@/app/lib/api/serverStoryApi';
import Section from '@/components/Section/Section';
import Story from '@/components/Story/Story';
import css from './page.module.css';
import PopularStories from '@/components/PopularStories/PopularStories';

export default async function StoryPage({ params }: { params: Promise<{ storyId: string }> }) {
  const { storyId } = await params;

  const story = await fetchStoryServer(storyId);

  return (
    <Section sectionClassName={css.storyContainer} containerClassName={css.storyInnerContainer}>
      <Story story={story} />
      <PopularStories />
    </Section>
  );
}
