<<<<<<< HEAD
import React from "react";
import { TNotification } from "../../lib/store/Notificator";
import ok from "../../static/ok.svg";

type TProps = {
  notification: TNotification;
  deleteFn: any
}
=======
import React from 'react';
import ok from '../../static/ok.svg';
import { EntityId } from '@reduxjs/toolkit';
import { useSelector } from '../../lib/hooks';
import { selectById } from '../../lib/store/notoficationSlice';
import classNames from 'classnames';

type TProps = {
  notificationId: EntityId;
  deleteFn: () => void;
};
>>>>>>> 8e49aec1be6aef715ee39c6b062ebeb8c8113984

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
<<<<<<< HEAD
    <div
      onClick={handlerClick}
      className={`notification-wrapper ${
        willDeleted && "delete-notification"
      } ${notification.type}`}
    >
      <img src={ok} alt={""}/>
=======
    <div onClick={handlerClick} className={notifiClassNames}>
      <img src={ok} alt={''} />
>>>>>>> 8e49aec1be6aef715ee39c6b062ebeb8c8113984
      <h1>{notification.label}</h1>
    </div>
  );
};
