import css from './TravellerCard.module.css';

export default function TravellerCard({ traveller }) {
  const { name, text, avatar } = traveller;

  return (
    <article className={css.card}>
      <img src={avatar} alt={name} className={css.avatar} />

      <h3 className={css.name}>{name}</h3>

      <p className={css.text}>{text}</p>

      <button className={css.button}>Переглянути профіль</button>
    </article>
  );
}
