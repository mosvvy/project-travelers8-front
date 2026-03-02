import AddStoryForm from '@/components/AddStoryForm/AddStoryForm';
import css from './page.module.css';

export default function CreateStoryPage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
  <div className={css.content}>
    <div className={css.leftColumn}>
      <h1 className={css.title}>Створити нову історію</h1>
      <AddStoryForm />
    </div>
  </div>
</div>
    </main>
  );
}