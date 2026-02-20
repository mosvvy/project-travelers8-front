'use client';

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error }: Props) => {
  return (
    <div>
      <p>Помилка запиту. {error.message}</p>
    </div>
  );
};

export default Error;
