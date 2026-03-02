'use client';

import AddStoryForm, { AddStoryFormValues } from '@/components/AddStoryForm/AddStoryForm';
import css from './page.module.css';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStoryById, updateStory } from '@/app/lib/api/api';
import type { StoryResponse } from '@/app/lib/api/api';
import { useQueryClient } from "@tanstack/react-query";
import { Story } from "@/types/story";

export default function EditStoryPage() {
  const queryClient = useQueryClient();
  const { storyId } = useParams<{ storyId: string }>();
  const router = useRouter();

  const [story, setStory] = useState<Story | null>(null);
  const [initialValues, setInitialValues] = useState<AddStoryFormValues | null>(
    null,
  );

  useEffect(() => {
    if (!storyId) return;

    async function fetchStory() {
      try {
        const story = await getStoryById(storyId);
        setStory(story);

        setInitialValues({
          img: null, 
          title: story.title || "",
          category:
            typeof story.category === "string"
              ? story.category
              : story.category?._id || "",
          article: story.article || "",
          date: story.date ? story.date.slice(0, 10) : "",
        });
      } catch (err) {
        console.error("Помилка при завантаженні історії:", err);
      }
    }

    fetchStory();
  }, [storyId]);
  const handleSubmit = async (values: AddStoryFormValues) => {
    if (!storyId) return;

     try {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("article", values.article);
    formData.append("category", values.category);
    formData.append("date", values.date);

    if (values.img) {
      formData.append("img", values.img);
    }

    await updateStory(storyId, formData);

      await queryClient.invalidateQueries({
        queryKey: ["stories"],
        exact: false,
      });
      await queryClient.refetchQueries({
        queryKey: ["stories"],
        exact: false,
      });

      router.push("/stories");
      // router.refresh();
    } catch (err) {
      console.error("Помилка при оновленні історії:", err);
    }
  };

  if (!initialValues || !story) return <div>Loading...</div>;

  return (
    <>
      <section className={`${css.stroryDatailsContainer} container`}>
        <h1 className={css.storyTitle}>Оновити історію</h1>
        <AddStoryForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          buttonText="Оновити історію"
          currentImage={story.img}
        />
      </section>
    </>
  );
}