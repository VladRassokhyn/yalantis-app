import React from 'react';
import { Notification } from './Notification';
import { useSelector } from '../../lib/hooks';
import {
  notificationRemoved,
  selectNotificationIds,
} from '../../lib/store/notoficationSlice';
import { useDispatch } from 'react-redux';

export const Notificator = () => {
  const dispatch = useDispatch();
  const notificationIds = useSelector(selectNotificationIds);

  return (
    <div className={'notificator-wrapper'}>
      {notificationIds
        .map((notificationId) => {
          return (
            <Notification
              deleteFn={() => dispatch(notificationRemoved(notificationId))}
              key={notificationId}
              notificationId={notificationId}
            />
          );
        })
        .reverse()}
    </div>
  );
};