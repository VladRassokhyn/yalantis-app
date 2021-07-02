import React from 'react';
import { Notification } from './Notification';
import { useSelector } from '../../lib/hooks';
import {
  notificationRemoved,
  selectNotificationIds,
} from '../../lib/store/notoficationSlice';
import { useDispatch } from 'react-redux';

export const Notificator = () => {
<<<<<<< HEAD

  const [state, dispatch] = useNotifiContext();
=======
  const dispatch = useDispatch();
  const notificationIds = useSelector(selectNotificationIds);
>>>>>>> 8e49aec1be6aef715ee39c6b062ebeb8c8113984

  const deleteFn = (id: string) => () => dispatch(deleteNotification(id))

  return (
    <div className={'notificator-wrapper'}>
      {notificationIds
        .map((notificationId) => {
          return (
            <Notification
<<<<<<< HEAD
              deleteFn={deleteFn(notification.id)}
              key={notification.id}
              notification={notification}
=======
              deleteFn={() => dispatch(notificationRemoved(notificationId))}
              key={notificationId}
              notificationId={notificationId}
>>>>>>> 8e49aec1be6aef715ee39c6b062ebeb8c8113984
            />
          );
        })
        .reverse()}
    </div>
  );
};
