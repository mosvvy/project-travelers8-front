import css from './Section.module.css';

type Props = {
  children: React.ReactNode;
  sectionClassName?: string;
  containerClassName?: string;
};

const Section = ({ children, sectionClassName, containerClassName }: Props) => {
  return (
    <section className={`${css.section} ${sectionClassName ?? ''}`}>
      <div className={`${css.container} ${containerClassName ?? ''}`}>{children}</div>
    </section>
  );
};

export default Section;
