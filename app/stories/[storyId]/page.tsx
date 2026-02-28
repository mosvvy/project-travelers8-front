import { fetchStory } from '@/app/lib/api/clientApi';
import Section from '@/components/Section/Section';
import Story from '@/components/Story/Story';

export default async function StoryPage({ params }: { params: Promise<{ storyId: string }> }) {
  const { storyId } = await params;
  const story = await fetchStory(storyId);

  return <Story story={story} />;
}
