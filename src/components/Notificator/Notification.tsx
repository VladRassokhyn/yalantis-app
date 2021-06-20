import React from "react";
import { TNotification } from "../../lib/types";
import { useNotifiDispatch } from "../../lib/store/hooks";
import { deleteNotification } from "../../lib/store/NotificationReducer";
import ok from '../../static/ok.svg';

export const Notification:
  React.FC<{ notification: TNotification}> = ({ notification }) => {

  const dispatch = useNotifiDispatch();
  const [willDeleted, setWillDeleted] = React.useState(false);

  const handlerClick = () => {
    setWillDeleted(true);
  };

  React.useEffect(() => {
      const timer = setTimeout(() => {
        setWillDeleted(true)
      }, 3000);
      return () => clearTimeout(timer)
  }, []);

  React.useEffect(() => {
    if (willDeleted) {
      let timer = setTimeout(() => {
        dispatch(deleteNotification(notification.id));
      }, 300);
      return () => clearTimeout(timer)
    }
  }, [willDeleted]);

  return <div
    onClick={handlerClick}
    className={`notification-wrapper ${willDeleted && "delete-notification"} ${notification.type}`}
  >
    <img src={ok} alt={''}/><h1>{notification.label}</h1>
  </div>;
};