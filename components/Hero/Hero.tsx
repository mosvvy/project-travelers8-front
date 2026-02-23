import css from './Hero.module.css';
import Button from '../Button/Button';
//import Section from '../Section/Section';

const Hero = () => {
  return (
    <Section className={css.hero}>
      <div className={css.heroBackground}>
        <div className={css.content}>
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
            variant="blue"
            fullWidth
            size="medium"
            className={heroButton}
          >
            Доєднатись
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
