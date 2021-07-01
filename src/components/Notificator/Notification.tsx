import React from 'react';
import ok from '../../static/ok.svg';
import { EntityId } from '@reduxjs/toolkit';
import { useSelector } from '../../lib/store/hooks';
import { selectById } from '../../lib/store/notoficationSlice';
import classNames from 'classnames';

type TProps = {
  notificationId: EntityId;
  deleteFn: () => void;
};

export const Notification: React.FC<TProps> = ({
  notificationId,
  deleteFn,
}) => {
  const [willDeleted, setWillDeleted] = React.useState(false);

  const notification = useSelector((state) =>
    selectById(state.notification, notificationId)
  );

  if (!notification) return null;

  const notifiClassNames = classNames({
    'notification-wrapper': true,
    'delete-notification': willDeleted,
    [`${notification.type}`]: true,
  });

  const handlerClick = React.useCallback(() => {
    setWillDeleted(true);
  }, [willDeleted] )

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setWillDeleted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (willDeleted) {
      let timer = setTimeout(() => {
        deleteFn();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [willDeleted]);

  return (
    <div onClick={handlerClick} className={notifiClassNames}>
      <img src={ok} alt={''} />
      <h1>{notification.label}</h1>
    </div>
  );
};
