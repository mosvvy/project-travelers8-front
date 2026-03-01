import { fetchStory } from '@/app/lib/api/clientApi';
import Section from '@/components/Section/Section';
import Story from '@/components/Story/Story';
import css from './page.module.css';

export default async function StoryPage({ params }: { params: Promise<{ storyId: string }> }) {
  const { storyId } = await params;
  const story = await fetchStory(storyId);

  return (
    <Section sectionClassName={css.storyContainer} containerClassName={css.storyInnerContainer}>
      <Story story={story} />
    </Section>
  );
}
