import AddStoryForm from '@/components/AddStoryForm/AddStoryForm';
import { getStoryById } from '@/app/lib/api/api';

interface Props {
  params: Promise<{ storyId: string }>;
}

export default async function EditStoryPage({ params }: Props) {
  const { storyId } = await params;   
  const story = await getStoryById(storyId);

  return (
    <>
      <h1>Редагувати історію</h1>
      <AddStoryForm initialData={story} isEdit />
    </>
  );
}