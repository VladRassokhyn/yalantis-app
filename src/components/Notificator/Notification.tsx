import React from 'react';
import ok from '../../static/ok.svg';
import x from '../../static/x.svg';
import { EntityId } from '@reduxjs/toolkit';
import { useSelector } from '../../lib/hooks/useSelector';
import { selectNotificationById } from '../../lib/store/selectors';
import classNames from 'classnames';
import { NotificationTypes } from '../../lib/types';

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
    selectNotificationById(state, notificationId)
  );

  if (!notification) return null;

  const notifiClassNames = classNames({
    'notification-wrapper': true,
    'delete-notification': willDeleted,
    'notification-error': notification.type === NotificationTypes.ERROR,
    'notification-success': notification.type === NotificationTypes.SUCCESS,
  });

  const img = notification.type === NotificationTypes.SUCCESS ? ok : x;
  const handlerClick = React.useCallback(() => {
    setWillDeleted(true);
  }, [willDeleted]);

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
      <img src={img} alt={''} />
      <h1>{notification.label}</h1>
    </div>
  );
};
