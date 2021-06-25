import React from 'react';
import { TNotification } from '../../lib/store/Notificator';
import ok from '../../static/ok.svg';

type TProps = {
  notification: TNotification;
  // eslint-disable-next-line no-unused-vars
  deleteFn: (id: string) => void;
};

export const Notification: React.FC<TProps> = ({ notification, deleteFn }) => {
  const [willDeleted, setWillDeleted] = React.useState(false);

  const handlerClick = () => {
    setWillDeleted(true);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setWillDeleted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (willDeleted) {
      let timer = setTimeout(() => {
        deleteFn(notification.id);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [willDeleted]);

  return (
    <div
      onClick={handlerClick}
      className={`notification-wrapper ${
        willDeleted && 'delete-notification'
      } ${notification.type}`}
    >
      <img src={ok} alt={''} />
      <h1>{notification.label}</h1>
    </div>
  );
};
