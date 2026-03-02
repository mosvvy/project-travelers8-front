import AddStoryForm from '@/components/AddStoryForm/AddStoryForm';
import css from './page.module.css';

export default function CreateStoryPage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Створити нову історію</h1>
        <AddStoryForm />
      </div>
    </main>
  );
}