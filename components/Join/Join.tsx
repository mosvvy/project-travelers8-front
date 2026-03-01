'use client';
import css from './Join.module.css';
import Link from '../Link/Link';
import Section from '../Section/Section';
import { useAuthStore } from '@/app/lib/store/authStore';

export default function Join() {
  const { isAuthenticated } = useAuthStore();
  return (
    <Section sectionClassName={css.join} containerClassName={css.joinContainer}>
      <div id='join' className={css.joinBackground}>
        <div className={css.joinContent}>
          <h2 className={css.joinTitle}>Приєднуйтесь до нашої спільноти</h2>
          <p className={css.joinDescription}>
            Долучайтеся до мандрівників, які діляться своїми історіями та надихають на нові пригоди.
          </p>

          <Link
            variant='primaryBtn'
            href={isAuthenticated ? '/profile' : '/auth/register'}
            className={css.joinButton}
          >
            Зареєструватися
          </Link>
        </div>
      </div>
    </Section>
  );
}
