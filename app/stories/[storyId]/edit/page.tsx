'use client';
import AddStoryForm from '@/components/AddStoryForm/AddStoryForm';
import css from './page.module.css';
import { fetchStoryById } from '@/app/lib/api/serverApi';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStory, type StoryResponse } from '@/app/lib/api/api';

export default function EditStoryPage() {
    const { storyId } = useParams<{ storyId: string }>();

    const [story, setStory] = useState<StoryResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const data = await getStory(storyId);

                if (mounted) setStory(data);
            } catch {
                if (mounted) setIsError(true);
            } finally {
                if (mounted) setIsLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [storyId]);

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Редагувати історію</h1>

                {isLoading && <p>Loading...</p>}

                {!isLoading && isError && (
                    <p>Не вдалося завантажити історію для редагування.</p>
                )}

                {!isLoading && !isError && story && (
                    <AddStoryForm storyId={storyId} initialData={story} />
                )}
            </div>
        </main>
    );
}