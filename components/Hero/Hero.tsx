'use client';

import css from './Hero.module.css';
import Link from '../Link/Link';
import Section from '../Section/Section';

const Hero = () => {
  return (
   <Section 
      sectionClassName={css.hero} 
      containerClassName={css.heroContainer}>
      <h1 className={css.heroTitle}>
        Відкрийте світ подорожей з нами!
      </h1>
      <p className={css.heroDescription}>
        Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
        своїми історіями та отримувати натхнення для нових пригод. Відкрийте
        для себе нові місця та знайдіть однодумців!
      </p>
      <Link 
        href="#join" 
        variant="link"
        className={css.heroButton}
      >
        Доєднатись
      </Link>
    </Section>
  );
};

export default Hero;
