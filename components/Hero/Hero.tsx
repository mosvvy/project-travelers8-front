'use client';

import css from './Hero.module.css';
import Button from '../Button/Button';
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
      <Button 
        href="#join" 
        variant="primary"
        className={css.heroButton}
      >
        Доєднатись
      </Button>
    </Section>
  );
};

export default Hero;
