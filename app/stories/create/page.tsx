'use client';

import AddStoryForm, { AddStoryFormValues } from '@/components/AddStoryForm/AddStoryForm';
import css from './page.module.css';
import { createStory } from '@/app/lib/api/api';
import { useRouter } from 'next/navigation';

const emptyInitialValues: AddStoryFormValues = {
  img: null,
  title: '',
  category: '',
  article: '',
  date: '',
};

export default function CreateStoryPage() {
  const router = useRouter();

  const handleSubmit = async (values: AddStoryFormValues) => {
    const formData = new FormData();
    if (values.img) formData.append('img', values.img);
    formData.append('title', values.title);
    formData.append('category', values.category);
    formData.append('article', values.article);

    const res = await createStory(formData);
    if (!res?._id) {
    console.error('No _id returned:', res);
    return;
  }
    router.push(`/stories/${res._id}`);
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Створити нову історію</h1>

        <AddStoryForm
          initialValues={emptyInitialValues}
          onSubmit={handleSubmit}
          buttonText="Створити історію"
        />
      </div>
      
    </main>
  );
}
