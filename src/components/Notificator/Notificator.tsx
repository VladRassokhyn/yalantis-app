import React from 'react';
import {
  deleteNotification,
  useNotifiContext,
} from '../../lib/store/Notificator';
import { Notification } from './Notification';

export const Notificator = () => {

  const [state, dispatch] = useNotifiContext();

  const deleteFn = (id: string) => () => dispatch(deleteNotification(id))

  return (
    <div className={'notificator-wrapper'}>
      {state
        .map((notification) => {
          return (
            <Notification
              deleteFn={deleteFn(notification.id)}
              key={notification.id}
              notification={notification}
            />
          );
        })
        .reverse()}
    </div>
  );
};
