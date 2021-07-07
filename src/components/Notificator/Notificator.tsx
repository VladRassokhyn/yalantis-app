import React from 'react';
import { Notification } from './Notification';
import { useSelector } from '../../lib/hooks/useSelector';
import {
  notificationRemoved,
  selectNotificationIds,
} from '../../lib/store/notoficationSlice';
import { useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';

export const Notificator = () => {

  const parent = document.querySelector('#notificator');
  if (!parent) return null

  const dispatch = useDispatch();
  const notificationIds = useSelector(selectNotificationIds);

  return ReactDOM.createPortal(
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
    </div>,
    parent
  )
}