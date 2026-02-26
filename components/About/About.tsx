import React from 'react';
import Section from '../Section/Section';
import css from './About.module.css';

const features = [
  {
    title: 'Наша місія',
    text: 'Об’єднувати людей через любов до пригод та надихати на нові відкриття.',
    iconId: 'icon-wand_stars',
  },
  {
    title: 'Автентичні історії',
    text: 'Ми цінуємо справжні, нередаговані враження від мандрівників з усього світу.',
    iconId: 'icon-travel_luggage_and_bags',
  },
  {
    title: 'Ваша спільнота',
    text: 'Станьте частиною спільноти, де кожен може бути і автором, і читачем.',
    iconId: 'icon-communication',
  },
];

const About = () => {
  return (
    <Section>
      <div className={css.topContent}>
        <h2 className={css.title}>Проєкт, створений для тих, хто живе подорожами</h2>
        <p className={css.description}>
          Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб нею поділилися. Наша
          платформа створена, щоб об’єднати людей, закоханих у відкриття нового. Тут ви можете
          ділитися власним досвідом, знаходити друзів та надихатися на наступні пригоди разом з
          нами.
        </p>
      </div>

      <ul className={css.featuresList}>
        {features.map((item, index) => (
          <li key={index} className={css.featureItem}>
            <svg className={css.icon} width='32' height='32'>
              <use xlinkHref={`/icons/sprite.svg#${item.iconId}`} />
            </svg>
            <h3 className={css.featureTitle}>{item.title}</h3>
            <p className={css.featureText}>{item.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default About;
