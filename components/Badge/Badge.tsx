import css from './Badge.module.css';

const Badge = ({ children }: { children: React.ReactNode }) => (
  <div className={css.badge}>{children}</div>
);

export default Badge;
